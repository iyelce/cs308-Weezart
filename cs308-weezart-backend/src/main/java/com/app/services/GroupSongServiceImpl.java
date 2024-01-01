package com.app.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;
import java.util.Set;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.controllers.AuthenticationController;
import com.app.models.Album;
import com.app.models.AnalysisObjectGroupSong;
import com.app.models.Artist;
import com.app.models.BigGroupSong;
import com.app.models.FriendNameAndSongs;
import com.app.models.GroupSong;
import com.app.models.Song;
import com.app.models.User;
import com.app.models.UserAlbum;
import com.app.models.UserArtist;
import com.app.models.UserSong;
import com.app.repo.AlbumRepository;
import com.app.repo.ArtistRepository;
import com.app.repo.GroupSongRepository;
import com.app.repo.SongRepository;
import com.app.repo.UserAlbumRepository;
import com.app.repo.UserArtistRepository;
import com.app.repo.UserRepository;
import com.app.repo.UserSongRepository;

@Service
public class GroupSongServiceImpl implements GroupSongService{
	private static final Logger log = LoggerFactory.getLogger(AuthenticationController.class);
	
	@Autowired
	private UserSongRepository userSongRepo;

	@Autowired
	private UserAlbumRepository userAlbumRepo;

	@Autowired
	private UserArtistRepository userArtistRepo;

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private ArtistRepository artistRepo;

	@Autowired
	private SongRepository songRepo;

	@Autowired
	private AlbumRepository albumRepo;
	
	@Autowired
	private GroupSongRepository groupSongRepo;
	
	public BigGroupSong returnPlaylist(String userIds) {

	    List<Long> userIdList = Arrays.stream(userIds.split("-"))
	            .map(Long::parseLong)
	            .sorted()
	            .collect(Collectors.toList());

	    String sortedUserIds = createGroupId(userIdList);
	    
	    GroupSong tempGroupSong = groupSongRepo.findByid(sortedUserIds);
	    if (tempGroupSong == null) {
	    	return null;
	    }
	    else {
	    	List<String> songIds = tempGroupSong.getGroupSongIds();
	    	List<Song> songSend = new ArrayList<>();
	    	for (String tempId : songIds) {
	    		Song tempSong = songRepo.findByid(tempId);
	    		songSend.add(tempSong);
	    	}
	    	BigGroupSong bigGroupSong = new BigGroupSong();
	    	bigGroupSong.setSongList(songSend);
	    	bigGroupSong.setUserSong(tempGroupSong);
	    	return bigGroupSong;
	    }

	}
	
	public GroupSong createPlaylist(String userIds) {
        List<Long> userIdList = Arrays.stream(userIds.split("-"))
                .map(Long::parseLong)
                .sorted()
                .collect(Collectors.toList());
             
        GroupSong groupSong = new GroupSong();
        groupSong.setId(createGroupId(userIdList));
        groupSong.setGroupSongNames(createGroupNames(userIdList));
        List<Song> tempSong = createSongList(userIdList);
        List<String> tempSongIds = new ArrayList<>();
        for (Song song : tempSong) {
        	String songId = song.getId();
        	tempSongIds.add(songId);
        }
        groupSong.setGroupSongIds(tempSongIds);
        return groupSongRepo.save(groupSong);
	}
	
	public void deleteGroup(String userIds, String deletedId) {
        List<Long> userIdList = Arrays.stream(userIds.split("-"))
                .map(Long::parseLong)
                .sorted()
                .collect(Collectors.toList());
        String oldGroupId = createGroupId(userIdList);
        userIdList.remove(Long.parseLong(deletedId));
        String newGroupId = createGroupId(userIdList);
        GroupSong groupTBD = groupSongRepo.findByid(oldGroupId);
        if (groupTBD != null) {
        	groupSongRepo.delete(groupTBD);
        
        
	        if (returnPlaylist(newGroupId)==null && userIdList.size()>1) { // if the new group with removed ID does not exist, we need to create playlist for it
	        	createPlaylist(newGroupId);
	        }
        }
	}
	

	public List<BigGroupSong> getAll(String id){
		List<GroupSong> allGroups = groupSongRepo.findAll();
		List<BigGroupSong> wantedGroups = new ArrayList<>();
		for (GroupSong group : allGroups) {
			String groupId = group.getId();
			if (groupId.contains(id)) {
				BigGroupSong bigGroupSong = new BigGroupSong();
				bigGroupSong.setUserSong(group);
		    	List<String> songIds = group.getGroupSongIds();
		    	List<Song> songSend = new ArrayList<>();
		    	for (String tempId : songIds) {
		    		Song tempSong = songRepo.findByid(tempId);
		    		songSend.add(tempSong);
		    	}
		    	bigGroupSong.setSongList(songSend);				
				wantedGroups.add(bigGroupSong);
			}
		}
		return wantedGroups;
	}
	
	public AnalysisObjectGroupSong analysisPlaylist(String userIds){
        List<Long> userIdList = Arrays.stream(userIds.split("-"))
                .map(Long::parseLong)
                .sorted()
                .collect(Collectors.toList());
        List<User> userList = new ArrayList<>();
        List<Integer> addList = new ArrayList<>();
        List<Integer> likeList = new ArrayList<>();
        List<Integer> avgList = new ArrayList<>();

        
        for (Long longId : userIdList) {
            User user = userRepo.findByiduser(longId);
            userList.add(user);
            List<UserSong> userSongs = userSongRepo.findAllByUser(user);

            addList.add(userSongs.size());
            likeList.add((int) userSongs.stream().filter(UserSong::isLiked).count());
            avgList.add((int) userSongs.stream()
                    .filter(userSong -> userSong.getRating() != null && !userSong.getRating().isEmpty() && userSong.getRating().stream().anyMatch(rating -> rating != 0))
                    .count());
        }
        String oldGroupId = createGroupId(userIdList);
        GroupSong groupSong = groupSongRepo.findByid(oldGroupId);
        
        List<Integer> releaseYears = new ArrayList<>();
    	List<String> songIds = groupSong.getGroupSongIds();
    	for (String tempId : songIds) {
    		Song tempSong = songRepo.findByid(tempId);
    		String albumReleaseYear = tempSong.getAlbumRelease();
    		int year = Integer.parseInt(albumReleaseYear.substring(0,4));
    		releaseYears.add(year);
    	}
    	
    	Map<Integer,Integer> decades = new HashMap<>();
        for (int year : releaseYears) {
            int decade = year / 10 * 10;
            decades.put(decade, decades.getOrDefault(decade, 0) + 1);
        }
        
        int mostFrequentDecade = 0;
        int maxCount = 0;

        for (Map.Entry<Integer, Integer> entry : decades.entrySet()) {
            int currentCount = entry.getValue();
            if (currentCount > maxCount) {
                maxCount = currentCount;
                mostFrequentDecade = entry.getKey();
            }
        }
        
        AnalysisObjectGroupSong analysisObjectGroupSong = new AnalysisObjectGroupSong();
        analysisObjectGroupSong.setUserList(userList);
        analysisObjectGroupSong.setAddList(addList);
        analysisObjectGroupSong.setLikeList(likeList);
        analysisObjectGroupSong.setAvgList(avgList);
        analysisObjectGroupSong.setDecade(Integer.toString(mostFrequentDecade));
        
    	
    	return analysisObjectGroupSong;
        
	}
	
	
	//--------------------------- Local Functions ----------------------------
	private List<Song> createSongList(List<Long> userIdList) {
	    List<Song> playlist = new ArrayList<>();
	    Integer count = 0;
	    

	    for (Long userId : userIdList) {
	    	count = 5;
	        List<Song> randomSongs = getRandomSongsForUser(userId, 15);

	        Set<String> addedSongIds = playlist.stream().map(Song::getId).collect(Collectors.toSet());
	        for (String id : addedSongIds) {
	        }
	        for (Song song : randomSongs) {
	            
	            if (!addedSongIds.contains(song.getId())) {
	            	count = count +1;
	                playlist.add(song);

	                if (count % 5 == 0) {
	                    break;
	                }
	            }
	        }
	    }
	    return playlist;
	}
	
	

	private List<Song> getRandomSongsForUser(Long userId, int count) {
		User currentUser = userRepo.findByiduser(userId);
		List<UserSong> allSongs = userSongRepo.findAllByUser(currentUser);
	    Collections.shuffle(allSongs);

	    List<Song> tempSongs = allSongs.stream()
	            .map(UserSong::getSong)
	            .limit(count)
	            .collect(Collectors.toList());
	    for (Song song : tempSongs) {
	    	log.info(song.getName());
	    }
	    return tempSongs;
	}


    private String createGroupId(List<Long> userIdList) {
        return userIdList.stream()
                .map(String::valueOf)
                .collect(Collectors.joining("-"));
    }
    
    private List<String> createGroupNames(List<Long> userIdList) {
    	List<String> usernameList = new ArrayList<>();
    	for (Long id : userIdList) {
    		User user = userRepo.findByiduser(id);
    		String name = user.getUsername();
    		usernameList.add(name);
    	}
    	return usernameList;
    	
    }

}

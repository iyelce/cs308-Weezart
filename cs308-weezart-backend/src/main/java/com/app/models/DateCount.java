package com.app.models;

import java.util.List;

public class DateCount {
    private List<String> dates;
    private List<Double> songCounts;

    public DateCount(List<String> dates, List<Double> songCounts) {
        this.dates = dates;
        this.songCounts = songCounts;
    }

    public List<String> getDates() {
        return dates;
    }

    public List<Double> getSongCounts() {
        return songCounts;
    }

}

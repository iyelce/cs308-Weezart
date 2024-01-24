// token islemleri classı
package com.app.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtTokenUtil {

	// token olusturma icin secret key
    @Value("${jwt.secret}")
    private String secret;
 
    // token gecerlilik suresi
    @Value("${jwt.expiration}")
    private Long expiration;
    
    private static final Logger log = LoggerFactory.getLogger(JwtTokenUtil.class);

    // token olustur
    public String generateToken(UserDetails userDetails) {
    	log.info("token generate ediyoooooooooooooo");
        Map<String, Object> claims = new HashMap<>();
        
        claims.put("role", userDetails.getAuthorities());
        log.info(userDetails.getAuthorities().toString());
        String token = createToken(claims, userDetails.getUsername());
        log.info(token);
        log.info("extracting roles: " + extractAllClaims(token).toString());
        return token;
    }

    
    // validate token
    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        String role = extractAllClaims(token).toString();
        log.info(username + "------ " + role);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    // token olusturma helper
    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration)) 
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }

    // tokenden username cek
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // tokenden gecerlilik tarihi cek
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // claimleri cek
    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();
    }

    private Boolean isTokenExpired(String token) {
        final Date expiration = extractExpiration(token);
        return expiration.before(new Date());
    }
}
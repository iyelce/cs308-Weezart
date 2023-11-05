// custom jwt token filter
package com.app.filter;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
@Component
public class JwtTokenFilter extends OncePerRequestFilter {

	    private final JwtTokenUtil jwtTokenUtil;
	    private final UserDetailsService userDetailsService;
	    
	    private static final Logger log = LoggerFactory.getLogger(JwtTokenFilter.class);
	    
	
	    public JwtTokenFilter(JwtTokenUtil jwtTokenUtil, UserDetailsService userDetailsService) {
	        this.jwtTokenUtil = jwtTokenUtil;
	        this.userDetailsService = userDetailsService;
	    }
	
		@Override
		protected void doFilterInternal(
				jakarta.servlet.http.HttpServletRequest request,
				jakarta.servlet.http.HttpServletResponse response, jakarta.servlet.FilterChain filterChain)
				throws jakarta.servlet.ServletException, IOException {
				log.info("JWTTokenFilter in the doFilterInternal-------------");
	
				
				
				final String header = request.getHeader(HttpHeaders.AUTHORIZATION);
				
				log.info("request:  "+ request.getRequestURL());
			
				// login request ise token validate etme
				if (isLoginRequest(request)) {
					
					filterChain.doFilter(request, response);
					return;
				}
			    
				// token yanlıs ise
				if (header == null || !header.startsWith("Bearer ")) {
				    log.info("JWT header null or Bearer missing");
				    filterChain.doFilter(request, response);
				    return;
				}
				// token cek
				final String token = header.split(" ")[1].trim();
				log.info("JWT--- " + token);
				    
				log.info("jwt filterda username   " + jwtTokenUtil.extractUsername(token));
				    
	
				UserDetails userDetails = userDetailsService
				    .loadUserByUsername(jwtTokenUtil.extractUsername(token));
	
				// token validation
				if (jwtTokenUtil.validateToken(token, userDetails)) {
				    log.info("Token is valid");
				        
				    UsernamePasswordAuthenticationToken authentication =
				        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
				        
				    log.info("UsernamePasswordAuthenticationToken  " + authentication.toString());
				        
				    SecurityContextHolder.getContext().setAuthentication(authentication);
				} else {
				    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
				    response.getWriter().write("Unauthorized: Invalid token");
				    return;
				}
	
				
			
			filterChain.doFilter(request, response);
			
			
		
		}

		private boolean isLoginRequest(HttpServletRequest request) {
			return request.getRequestURI().equals("/auth/login");
		}

}
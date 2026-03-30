package com.soulmate.recommender.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import com.soulmate.recommender.model.Candidate;

@Configuration
public class RedisConfig {
  @Bean
  public RedisTemplate<String, Candidate> redisTemplate(RedisConnectionFactory connectionFactory) {
    RedisTemplate<String, Candidate> template = new RedisTemplate<>();
    template.setConnectionFactory(connectionFactory);
    template.setKeySerializer(new StringRedisSerializer());
    template.setValueSerializer(new Jackson2JsonRedisSerializer<>(Candidate.class));
    return template;
  }
}

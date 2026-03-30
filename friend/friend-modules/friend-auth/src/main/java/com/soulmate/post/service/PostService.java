package com.soulmate.post.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.soulmate.auth.entity.User;
import com.soulmate.auth.repository.UserRepository;
import com.soulmate.post.entity.Post;
import com.soulmate.post.entity.PostLike;
import com.soulmate.post.entity.Comment;
import com.soulmate.post.repository.PostRepository;
import com.soulmate.post.repository.PostLikeRepository;
import com.soulmate.post.repository.CommentRepository;
import com.soulmate.post.entity.CommentLike;

@Service
public class PostService {
    @Autowired private PostRepository postRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private CommentRepository commentRepository;
    @Autowired private PostLikeRepository postLikeRepository;
    @Autowired private CommentLikeRepository commentLikeRepository;

    public List<Post> findAll() {
        return postRepository.findAll();
    }

    public Optional<Post> findById(Long id) {
        return postRepository.findById(id);
    }

    @Transactional
    public Post createPost(Long userId, String content) {
        User user = userRepository.findById(userId).orElseThrow();
        Post p = new Post(user, content);
        return postRepository.save(p);
    }

    @Transactional
    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }

    @Transactional
    public void likePost(Long postId, Long userId) {
        Post post = postRepository.findById(postId).orElseThrow();
        User user = userRepository.findById(userId).orElseThrow();
        if (postLikeRepository.findByPostAndUser(post, user).isPresent()) return;
        PostLike pl = new PostLike(post, user);
        postLikeRepository.save(pl);
    }

    @Transactional
    public void unlikePost(Long postId, Long userId) {
        Post post = postRepository.findById(postId).orElseThrow();
        User user = userRepository.findById(userId).orElseThrow();
        postLikeRepository.findByPostAndUser(post, user).ifPresent(pl -> postLikeRepository.delete(pl));
    }
}

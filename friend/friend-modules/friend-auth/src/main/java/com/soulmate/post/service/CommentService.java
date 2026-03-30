package com.soulmate.post.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.soulmate.auth.entity.User;
import com.soulmate.auth.repository.UserRepository;
import com.soulmate.post.entity.Comment;
import com.soulmate.post.entity.Post;
import com.soulmate.post.repository.CommentRepository;
import com.soulmate.post.repository.PostRepository;

@Service
public class CommentService {
    @Autowired private CommentRepository commentRepository;
    @Autowired private PostRepository postRepository;
    @Autowired private UserRepository userRepository;

    @Transactional
    public Comment addComment(Long postId, Long userId, String content) {
        Post post = postRepository.findById(postId).orElseThrow();
        User user = userRepository.findById(userId).orElseThrow();
        Comment c = new Comment(post, user, content);
        return commentRepository.save(c);
    }

    public List<Comment> findByPost(Long postId) {
        Post post = postRepository.findById(postId).orElseThrow();
        return post.getComments();
    }
}

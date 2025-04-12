import React from 'react';
import { List, Avatar, Input, Button, Rate } from 'antd';

interface Comment {
  comment: string;
  rating: number | undefined;
  fullname: string;
}

interface CommentsSectionProps {
  comments: Comment[];
  newComment: string;
  setNewComment: (value: string) => void;
  newRating: number | undefined;
  setNewRating: (value: number) => void;
  handleAddComment: () => void;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ comments, newComment, setNewComment, newRating, setNewRating, handleAddComment }) => (
  <div className="comments-section">
    <h2>Bình luận</h2>
    <List
      className="comment-list"
      header={`${comments.length} bình luận`}
      itemLayout="horizontal"
      dataSource={comments}
      renderItem={(item, index) => (
        <li key={index}>
          <Avatar src="https://via.placeholder.com/40" alt="User Avatar" />
          <div>
            <Rate disabled value={item.rating} />
            <p><strong>{item.fullname}:</strong> {item.comment}</p>
          </div>
        </li>
      )}
    />
    <div className="comment-input">
      <Rate value={newRating} onChange={setNewRating} />
      <Input.TextArea
        rows={4}
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Nhập bình luận của bạn"
      />
      <Button type="primary" onClick={handleAddComment} style={{ marginTop: '10px' }}>
        Thêm bình luận
      </Button>
    </div>
  </div>
);

export default CommentsSection;

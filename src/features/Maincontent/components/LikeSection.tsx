import React from 'react';
import { Button } from 'antd';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

interface LikeSectionProps {
  liked: boolean;
  handleLike: () => void;
}

const LikeSection: React.FC<LikeSectionProps> = ({ liked, handleLike }) => (
  <div className="like-section">
    <Button type="default" onClick={handleLike}>
      {liked ? <Favorite /> : <FavoriteBorder />}
      {liked ? 'Bỏ thích' : 'Yêu thích'}
    </Button>
  </div>
);

export default LikeSection;

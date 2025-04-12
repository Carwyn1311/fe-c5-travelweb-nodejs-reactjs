import React from 'react';
import { Card, List } from 'antd';
import './Help.css'; // Import CSS

const Help = () => {
  const contactInfo = [
    { type: 'Website', link: 'https://beacons.ai/carwyn1311', display: 'https://beacons.ai/carwyn1311' },
    { type: 'Hotline', link: 'tel:0904752033', display: '0904752033' },
    { type: 'Gmail', link: 'mailto:phucle11132003@gmail.com', display: 'phucle11132003@gmail.com' },
    { type: 'Zalo', link: 'https://zalo.me/84904752033', display: 'Zalo Contact' },
    { type: 'Facebook', link: 'https://web.facebook.com/carwyn1311', display: 'Facebook Profile' }
  ];

  return (
    <div className="help-container">
      <Card title="Liên hệ với chúng tôi" className="help-card">
        <List
          itemLayout="horizontal"
          dataSource={contactInfo}
          renderItem={item => (
            <List.Item className="help-list-item">
              <List.Item.Meta
                title={<a href={item.link} target="_blank" rel="noopener noreferrer" className="help-list-item-meta-title">{item.type}</a>}
                description={<a href={item.link} target="_blank" rel="noopener noreferrer" className="help-list-item-meta-description">{item.display}</a>}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default Help;

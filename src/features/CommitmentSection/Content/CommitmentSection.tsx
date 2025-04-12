import React from 'react';
import '../.css/CommitmentSection.css';

interface CommitmentItem {
  icon: string;
  title: string;
  description: string;
}

const commitmentData: CommitmentItem[] = [
  {
    icon: '/images/price.png',
    title: 'GIÁ TỐT - NHIỀU ƯU ĐÃI',
    description: 'Ưu đãi và quà tặng hấp dẫn khi mua tour online',
  },
  {
    icon: '/images/pay.png',
    title: 'THANH TOÁN AN TOÀN',
    description: 'Được bảo mật bởi tổ chức quốc tế Global Sign',
  },
  {
    icon: '/images/promotion.png',
    title: 'TƯ VẤN MIỄN PHÍ',
    description: 'Hỗ trợ tư vấn online miễn phí',
  },
  {
    icon: '/images/star.png',
    title: 'THƯƠNG HIỆU UY TÍN',
    description: 'Thương hiệu lữ hành hàng đầu Việt Nam',
  },
];

const CommitmentSection: React.FC = () => {
    return (
      <section className="whiteSection">
        <div className="container commitment">
          <div className="row">
            {commitmentData.map((item, index) => (
              <div key={index} className="col-md-3 col-sm-6 col-xs-12">
                <div className="commitment-box">
                  <div className="commitment-image">
                    <img
                      className="icon-commitment"
                      src={item.icon}
                      alt={`commitment ${item.title}`}
                    />
                  </div>
                  <div className="commitment-content">
                    <span className="commitment-taitle">{item.title}</span>
                    <p className="commitment-description">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  

export default CommitmentSection;

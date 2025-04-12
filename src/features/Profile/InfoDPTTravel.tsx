import React from "react";
import { Typography, Card, CardContent, Container } from "@mui/material";

const DPTTravelInfo = [
    {
      title: "Lữ Hành DPTTravel - Cam Kết Vàng Cho Những Hành Trình Đầy Cảm Xúc",
      content: "Đội ngũ Lữ hành DPTTravel luôn làm việc chăm chỉ, tối đa công suất với tinh thần trách nhiệm cao, tận tâm phục vụ khách hàng bằng cả trái tim. Hành trình mới lạ độc đáo của chúng tôi trải khắp dải đất hình chữ S và khắp năm châu, lưu dấu trong tim hàng triệu du khách bằng cảm xúc thăng hoa, nụ cười hài lòng.",
    },
    {
      title: "Tầm Nhìn",
      content: "Lữ hành DPTTravel là thương hiệu lữ hành hàng đầu Việt Nam và trong khu vực Đông Nam Á. Với hơn 45 năm phục vụ hàng triệu lượt khách hàng, Lữ hành DPTTravel hiểu rõ khách hàng cần điều gì ở mỗi chuyến đi. Đó là một hành trình chất lượng và cảm xúc còn đọng lại sau mỗi chuyến đi.",
    },
    {
      title: "Sứ Mệnh",
      content: "Chúng tôi cam kết nâng cao chất lượng để tạo nên những hành trình, chuyến đi, hướng khách hàng đến những chuyến du lịch mà giá trị nằm lại ở cảm xúc.",
    },
    {
      title: "Chiến Lược",
      content: "Chúng tôi trân trọng, am hiểu du lịch truyền thống và hiện đại để hài hòa các hành trình, chiều lòng khách hàng bằng sự am hiểu về điểm đến và văn hóa. Đồng thời kết hợp với các đối tác uy tín, trân trọng và hiểu giá trị của những hành trình khám phá là cách để Lữ hành DPTTravel nâng tầm chất lượng của chính mình.",
    },
    {
      title: "Dấu Ấn Vàng Trong Lịch Sử Phát Triển Thương Hiệu",
      content: "Trong 48 năm kiến tạo và phát triển thương hiệu, Lữ hành DPTTravel vinh dự đón nhận nhiều giải thưởng, danh hiệu cao quý về du lịch, lữ hành trong nước và quốc tế.",
    },
    {
      title: "Thương Hiệu Quốc Gia",
      content: "Của Chính phủ Việt Nam, liên tục từ năm 2008 đến nay.",
    },
    {
      title: "Hướng Dẫn Viên",
      content: "“Linh hồn” của mỗi hành trình du lịch. Với hơn 1.000 hướng dẫn viên và cộng tác viên trên toàn quốc, Lữ hành DPTTravel là công ty lữ hành có lực lượng hướng dẫn viên hàng đầu Việt Nam. Không chỉ tận tâm với nghề, hướng dẫn viên Lữ hành DPTTravel còn là những người có kiến thức rộng, am hiểu về điểm đến. Hằng năm, Lữ hành DPTTravel đều tổ chức những khóa đào tạo chuyên môn và huấn luyện thực tế để nâng cao nghiệp vụ cũng như đào tạo thế hệ kế cận.",
    },
    {
      title: "Du Lịch Trong Nước",
      content: "Lữ hành DPTTravel mang đến cho du khách hơn 300 sản phẩm du lịch nội địa với những tuyến điểm độc đáo, trải nghiệm khác biệt. Qua những hành trình đầy cảm xúc của Lữ hành DPTTravel, du khách sẽ thêm yêu quê hương tươi đẹp của mình.",
    },
    {
      title: "Du Lịch Quốc Tế",
      content: "Là nhà điều hành, tổ chức tour uy tín tại thị trường Đông Nam Á, chúng tôi tạo ra những hành trình đa dạng về văn hóa, lịch sử và điểm đến tại Việt Nam theo các chủ đề hấp dẫn, giúp du khách cảm nhận một đất nước Việt Nam giàu bản sắc, thiên nhiên tươi đẹp và con người thân thiện.",
    },
    {
      title: "Sự An Tâm Tuyệt Đối",
      content: "Mang đến cho khách hàng sự an tâm tối đa trong các hành trình du lịch thông qua gói dịch vụ bảo hiểm du lịch toàn cầu, với mức bảo hiểm lên đến 2,4 tỷ đồng/khách (du lịch nước ngoài) và 150 triệu đồng/khách (du lịch trong nước).",
    },
  ];
  

const InfoDPTTravel: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      {DPTTravelInfo.map((section, index) => (
        <Card
          key={index}
          sx={{
            marginBottom: 3,
            boxShadow: 3,
            borderRadius: 2,
            padding: 2,
            backgroundColor: "#f5f5f5",
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              component="h2"
              sx={{ color: "#1976d2", fontWeight: "bold" }}
            >
              {section.title}
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 1 }}>
              {section.content}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default InfoDPTTravel;

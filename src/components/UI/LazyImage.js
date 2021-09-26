import styled from "styled-components";

const ImageContainer = styled.div`
  height: ${(props) => props.imgContainer[0]};
  @media (max-width: 768px) {
    height: ${(props) => props.imgContainer[1]};
  }
`;

const Image = styled.img`
  height: ${(props) => props.imgSize[0]};
  @media (max-width: 768px) {
    height: ${(props) => props.imgSize[1]};
  }
  @media (max-width: 576px) {
    height: ${(props) => props.imgSize[2]};
  }
`;

const MyImage = (props) => {
  return (
    <ImageContainer imgContainer={props.imgContainer}>
      <Image src={props.item.img} imgSize={props.imgSize} />
    </ImageContainer>
  );
};

export default MyImage;

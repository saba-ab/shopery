import styled from "styled-components";

export const Card = styled.div`
  border: 1px solid #e7e7e7;
  border-radius: 10px;
  padding: 20px;
  max-width: 260px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    transform: scale(1.05);
    border: 1px solid blue;
  }
`;

export const ProductImage = styled.img`
  width: 60%;
  object-fit: cover
  border-radius: 5px;
`;

export const ProductTitle = styled.h3`
  color: #333;
  font-size: 16px;
  margin-top: 15px;
  margin-bottom: 10px;
  text-align: center;
`;

export const ProductPrice = styled.div`
  color: #e4723c;
  font-size: 1.5em;
  margin-bottom: 10px;
`;

export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
`;

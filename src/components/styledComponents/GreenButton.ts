import styled from "styled-components";
export const GreenButton = styled.button`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  margin: 0 0.5rem;
  padding: 0.5rem 2rem;
  border: none;
  border-radius: 20px;
  background-color: #00b207;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #157243;
    transform: scale(1.05);
  }
`;

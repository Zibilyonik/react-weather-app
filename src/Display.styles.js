import styled from 'styled-components';
import { Select } from 'antd';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin: 10vh auto;
  padding: 20px;
  background-color: #f5f5f5;
`;

const Section = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

const StyledSelect = styled(Select)`
    max-width: 200px;
    min-width: 100px;
    margin: 0 10px;
`;

const DisplaySection = styled.div`
  justify-content: center;
  align-items: center;
  margin: 10px;
  width: 100%;
`;

const StyledLabel = styled.label`
  display: block;
  margin: 0 10px;
`;


export { Container, StyledSelect, Section, DisplaySection, StyledLabel };
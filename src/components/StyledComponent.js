import styled, { keyframes } from 'styled-components';

export const Main = styled.main`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  @media (min-width: 600px) and (max-width: 999px) {
    padding: 0 20px;
  }
  @media (max-width: 599px) {
    justify-content: center;
    flex-direction: column;
    padding: 0 20px 50px;
    gap: 250px;
  }
`

export const TodoListWrap = styled.section`
  width: 50%;
  height: 100%;
  box-sizing: border-box;
  @media (min-width: 600px) and (max-width: 999px) {
  }
  @media (max-width: 599px) {
    width: 100%;
    height: 100%;
  }

`

export const TodoListBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  box-shadow: 1px 0 12px 1px rgba(0,0,0,.2);
  @media (min-width: 600px) and (max-width: 999px) {

  }
  @media (max-width: 599px) {

  }
`

export const DateAndDay = styled.div`
  width: 100%;
  padding: 30px 0;
  text-align: center;
  background-color: #FEFAE0;
  border-bottom: 1px solid rgba(169, 179, 136, .5);
  .date {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    gap: 10px;
    p {
      font-size: 18px;
      font-weight: bold;
    }
    span {
      font-size: 14px;
      color: rgba(95, 111, 82, .5);
    }
  }
`

export const TodoListBoxItem = styled.div`
  position: relative;

`

export const ListItems = styled.div`
  height: 300px;
  padding: .625rem .625rem 1.25rem;
  overflow-x: hidden;
  overflow-y: auto;
  box-sizing: border-box;
`

export const ListEdit = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 20px;
  border-top: 1px solid rgba(169, 179, 136, .5);
  box-sizing: border-box;
  p {
    color: #A9B388;
    span {
      font-weight: bold;
      color: rgba(95, 111, 82, .7);
    }
  }
`

export const TodoEditerWrap = styled.div`
  position: absolute;
  left: 2%; top: ${props => (props.$isOpen ? '100%' : '60%')};
  z-index: -5;
  width: 96%;
  padding: 35px 20px 20px;
  opacity: ${props => (props.$isOpen ? 1 : 0)};
  visibility: visible;
  background-color: #fff;
  border-radius: 0 0 20px 20px;
  box-sizing: border-box;
  transition: .5s ease-in-out;
`

export const NewTodoLabel = styled.label`
  position: absolute;
  top: 50%; left: 10px;
  font-size: 14px;
  color: #ccc;
  transform: translateY(-50%);
  transition: .3s ease;
  pointer-events: none;
`

export const EditPopupWrap = styled.div`
  position: fixed;
  top: 0; left: 0;
  z-index: ${props => (props.$edit ? 10 : -10)};
  width: 100%; height: 100%;
  background-color: rgba(0,0,0,.7);
  opacity: ${props => (props.$edit ? 1 : 0)};
  transition: opacity .5s;
`

const greentopBubbles = keyframes`
  0% {
    background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%, 40% 90%, 55% 90%, 70% 90%;
  }

  50% {
    background-position: 0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%, 50% 50%, 65% 20%, 90% 30%;
  }

  100% {
    background-position: 0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%, 50% 40%, 65% 10%, 90% 20%;
    background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
  }
`

const greenbottomBubbles = keyframes`
  0% {
    background-position: 10% -10%, 30% 10%, 55% -10%, 70% -10%, 85% -10%, 70% -10%, 70% 0%;
  }

  50% {
    background-position: 0% 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%, 95% 60%, 105% 0%;
  }

  100% {
    background-position: 0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%, 110% 10%;
    background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
  }
`

export const Button = styled.button`
  position: relative;
  z-index: 2;
  border: none;
  color: #fff;
  cursor: pointer;
  background-color: #A9B388;
  transition: all .5s ease;
  &:active {
    transform: scale(0.96);
  }
  &::before, &::after {
    position: absolute;
    content: "";
    width: 150%;
    left: 50%;
    height: 100%;
    transform: translateX(-50%);
    z-index: 1;
    background-repeat: no-repeat;
    pointer-events: none;
  }
  &:hover {
    background-color: #5F6F52;
  }
  &:hover::before {
    top: -70%;
    background-image: radial-gradient(circle, #5F6F52 20%, transparent 20%),
    radial-gradient(circle, transparent 20%, #5F6F52 20%, transparent 30%),
    radial-gradient(circle, #5F6F52 20%, transparent 20%),
    radial-gradient(circle, #5F6F52 20%, transparent 20%),
    radial-gradient(circle, transparent 10%, #5F6F52 15%, transparent 20%),
    radial-gradient(circle, #5F6F52 20%, transparent 20%),
    radial-gradient(circle, #5F6F52 20%, transparent 20%),
    radial-gradient(circle, #5F6F52 20%, transparent 20%),
    radial-gradient(circle, #5F6F52 20%, transparent 20%);
    background-size: 10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%, 10% 10%, 18% 18%;
    background-position: 50% 120%;
    animation: ${greentopBubbles} 1s ease;
  }
  &:hover::after {
    bottom: -70%;
    background-image: radial-gradient(circle, #5F6F52 20%, transparent 20%),
    radial-gradient(circle, #5F6F52 20%, transparent 20%),
    radial-gradient(circle, transparent 10%, #5F6F52 15%, transparent 20%),
    radial-gradient(circle, #5F6F52 20%, transparent 20%),
    radial-gradient(circle, #5F6F52 20%, transparent 20%),
    radial-gradient(circle, #5F6F52 20%, transparent 20%),
    radial-gradient(circle, #5F6F52 20%, transparent 20%);
    background-size: 15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 20% 20%, 18% 18%;
    background-position: 50% 0%;
    animation: ${greenbottomBubbles} 1s ease;
  }
`

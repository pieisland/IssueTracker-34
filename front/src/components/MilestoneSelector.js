import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import SettingSvg from '../svgs/SettingSvg';
import CheckSvg from '../svgs/CheckSvg';

const MilestoneSelectorDiv = styled.div`
  position: relative;
  width: 20%;
`;

const MilestonesButton = styled.button`
  display: flex;
  background-color: white;
  border: 0;
  width: 100%;
  height: 34px;
  flex-direction: rows;
  justify-content: space-between;
  align-items: center;
  outline: 0;
  &:hover {
    color: blue;
  }

  &:hover svg {
    fill: blue;
  }
`;

const DropDownOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 80;
  display: block;
  background: transparent;
`;

const slideDownAnimation = keyframes`{
  0% { opacity: 0; transform: translateY(-5%); }   
100% { opacity: 1; transform: translateY(0%); }
}`;

const DropdownMenu = styled.div`
  position: absolute;
  margin-top: 12px;
  right: 0;
  bottom: auto;
  left: auto;
  width: 230px;
  top: 20px;
  padding: 0;
  z-index: 99;
  background-color: #fff;
  border-radius: 6px;
  border: 1px solid #ddd;
  animation: ${slideDownAnimation} 0.1s ease-out;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  padding: 7px 9px 7px 16px;
  font-weight: 600;
  background-color: #fafbfc;
`;

const Hr = styled.hr`
  margin: 0;
  padding: 0;
  width: 100%;
  border: 1px solid #eee;

  margin-top: ${(props) => props.marginTop || '0'};
`;

const DropDownListWrapper = styled.div`
  max-height: 285px;
  overflow-y: auto;
  overflow-x: hidden;
`;

const MilestoneDiv = styled.div`
  display: flex;
  align-items: center;
  height: 34px;
  margin: 0px 16px;
`;

const CheckedMilestoneDiv = styled.div`
  display: flex;
  align-items: center;
  height: 34px;
  font-size: 12px;
`;

const CheckedMilestonesDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 34px;
`;

const CheckedMilestoneInnerDiv = styled.div`
  background-color: ${(props) => props.backgroundColor || 'remon'};
  width: 95%;
  height: 80%;
  color: white;
  border-radius: 3px;
  padding: 3px;
  font-size: 12px;
`;

const Unchecked = styled.div`
  width: 16px;
  height: 16px;
`;

const MilestoneId = styled.span`
  font-size: 12px;
  font-weight: 500;
  margin-right: 8px;
  color: #000;
`;

const MilestoneSelector = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [milestones, setMilestone] = useState([
    {
      id: 1,
      title: 'wee1',
      description: '.',
      due_date: '',
      status_open_closed: true,
      checked: false,
    },
    {
      id: 2,
      title: 'wee2',
      description: '.',
      due_date: '',
      status_open_closed: true,
      checked: false,
    },
    {
      id: 3,
      title: 'wee3',
      description: '.',
      due_date: '',
      status_open_closed: true,
      checked: false,
    },
    {
      id: 4,
      title: 'wee4',
      description: '.',
      due_date: '',
      status_open_closed: true,
      checked: false,
    },
    {
      id: 5,
      title: 'wee5',
      description: '.',
      due_date: '',
      status_open_closed: true,
      checked: false,
    },
  ]);

  let isMilestoneChecked = false;
  const checkedMilestone = milestones.map((milestone, idx) => {
    if (milestone.checked) {
      isMilestoneChecked = true;
      return <div key={idx}>{milestone.title}</div>;
    }
  });

  const selectMilestone = (id) => {
    const newMilestones = milestones.map((milestone) => {
      if (milestone.id === id) {
        milestone.checked = !milestone.checked;

        //선택된 애 없음. 해제됨.
        if (milestone.checked == false) {
          isMilestoneChecked = false;
        }
        isMilestoneChecked = true;
      } else {
        if (milestone.checked) {
          milestone.checked = false;
        }
      }
      return milestone;
    });

    setMilestone(newMilestones);
  };

  const allMilestones = milestones.map((milestone, idx) => {
    return (
      <div
        key={idx}
        onClick={() => {
          selectMilestone(milestone.id);
          setIsOpen(false);
        }}
      >
        <MilestoneDiv>
          {milestone.checked ? <CheckSvg /> : <Unchecked />}
          <MilestoneId>{milestone.title}</MilestoneId>
        </MilestoneDiv>
        <Hr />
      </div>
    );
  });

  return (
    <MilestoneSelectorDiv>
      <MilestonesButton onClick={() => setIsOpen(true)}>
        <div>Milestone</div>
        <SettingSvg />
      </MilestonesButton>
      {isMilestoneChecked === false ? (
        <CheckedMilestoneDiv>No milestone</CheckedMilestoneDiv>
      ) : (
        <> {checkedMilestone} </>
      )}

      {isOpen && (
        <>
          <DropDownOverlay onClick={() => setIsOpen(false)} />
          <DropdownMenu>
            <Header>
              <span>Set milestone</span>
            </Header>
            <Hr />
            <DropDownListWrapper>{allMilestones}</DropDownListWrapper>
          </DropdownMenu>
        </>
      )}
      <Hr marginTop={'15px'} />
    </MilestoneSelectorDiv>
  );
};

export default MilestoneSelector;

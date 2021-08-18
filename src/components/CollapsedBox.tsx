import React, { FC, useState } from 'react';
import {
  CollapseContainer,
  CollapseButton,
  CollapsedSummary,
  CollapsedContents,
  CollapsedAudio,
} from './CustomElements';

interface CollapsedBoxProps {
  name: string;
  summary?: string;
  contents?: string[];
  mp3File?: string;
  open: boolean;
  className: string;
}

const CollapsedBox: FC<CollapsedBoxProps> = ({ name, summary, contents, mp3File, open, className }) => {
  const [collapsed, setcollapsed] = useState(!open);

  const handleButtonClick = () => {
    setcollapsed(!collapsed);
  };

  return (
    <CollapseContainer className={className}>
      <CollapseButton aria-expanded={!collapsed} role="knapp" onClick={handleButtonClick}>
        {!collapsed ? '▼' : '▶'} {name}
      </CollapseButton>
      {!collapsed && summary && <CollapsedSummary aria-relevant="text">{summary}</CollapsedSummary>}
      {!collapsed && contents && (
        <CollapsedContents aria-relevant="text">
          {contents.map((value, index) => {
            return <p key={index}>{value}</p>;
          })}
        </CollapsedContents>
      )}
      {!collapsed && mp3File && (
        <CollapsedAudio>
          <audio controls controlsList="nodownload">
            <source src={mp3File} type="audio/mpeg" />
          </audio>
        </CollapsedAudio>
      )}
    </CollapseContainer>
  );
};

export default CollapsedBox;

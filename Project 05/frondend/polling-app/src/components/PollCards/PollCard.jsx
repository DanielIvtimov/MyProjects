import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { getPollBookmarked } from '../../utils/helper';
import "./styles/PollCard.css"
import UserProfileInfo from '../cards/UserProfileInfo';
import PollActions from './PollActions';
import PollContent from './PollContent';

const PollCard = ({
    pollId,
    question,
    type,
    options,
    voters,
    responses,
    creatorProfileImg,
    creatorName,
    creatorUsername,
    userHasVoted,
    isPollClosed,
    createdAt
}) => {

    const { user } = useContext(UserContext);

    const [selectedOptionsIndex, setSelectedOptionIndex] = useState(-1);
    const [rating, setRating] = useState(0);
    const [userResponse, setUserResponse] = useState("");

    const [isVoteComplete, setIsVoteComplete] = useState(userHasVoted);

    const [pollResult, setPollResult] = useState({
        options,
        voters,
        responses,
    });

    const isPollBookmarked = getPollBookmarked(pollId, user.bookmarkedPolls || []);

    const [pollBookmarked, setPollBookmarked] = useState(isPollBookmarked);
    const [pollClosed, setPollClosed] = useState(isPollClosed || false);
    const [pollDeleted, setPollDeleted] = useState(false);

    const handleInput = (value) => {
        if(type === "rating") setRating(value);
        else if (type === "open-ended") setUserResponse(value);
        else setSelectedOptionIndex(value);
    }

  return (
    !pollDeleted && (
        <div className="poll-card">
            <div className="flex-container">
                <UserProfileInfo imgUrl={creatorProfileImg} fullname={creatorName} username={creatorUsername} createdAt={createdAt} />
                <PollActions 
                    pollId={pollId}
                    isVoteComplete={isVoteComplete}
                    inputCaptured={!!(userResponse || selectedOptionsIndex >= 0 || rating)}
                    onVoteSubmit={() => {}}
                    isBookmarked={pollBookmarked}
                    toggleBookmark={() => {}}
                    isMyPoll={() => {}}
                    pollClosed={pollClosed}
                    onClosePoll={() => {}}
                    onDelete={() => {}}
                />
            </div>
            <div className="poll-card-question-container">
                <p className="poll-card-question">{question}</p>
                <div className="poll-card-question-divider">
                    <PollContent 
                        type={type}
                        options={options}
                        selectedOptionsIndex={selectedOptionsIndex}
                        onOptionSelect={handleInput}
                        rating={rating}
                        onRatingChange={handleInput}
                        userResponse={userResponse}
                        onResponseChange={handleInput}
                    />
                </div>
            </div>
        </div>
    )
  )
}

export default PollCard
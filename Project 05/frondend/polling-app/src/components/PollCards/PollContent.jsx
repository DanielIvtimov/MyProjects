import React from 'react'
import OptionInputTitle from '../input/OptionInputTitle';
import Rating from '../input/styles/Rating';

const PollContent = ({
    type,
    options,
    selectedOptionsIndex,
    onOptionSelect,
    rating,
    onRatingChange,
    userResponse,
    onResponseChange
}) => {
  switch(type){
    case "single-choice":
    case "yes/no":
        return(
            <>
                {options.map((option, index) => (
                    <OptionInputTitle 
                        key={option._id}
                        isSelected={selectedOptionsIndex === index}
                        label={option.optionText || ""}
                        onSelect={() => onOptionSelect(index)}
                    />
                ))}
            </>
        );
    case "rating":
        return <Rating value={rating} onChange={onRatingChange} />;

        default: 
            return null; 
  }
};

export default PollContent
interface Props {
  mood: string;
  timestamp: string;
  onDelete: () => Promise<void>;
  onUpdate: () => void;
}

const LoggedMood = ({ mood, timestamp, onDelete, onUpdate }: Props) => {
  return (
    <div>
      <div className="p-1 sm:p-2 md:p-3 lg:py-4.5 lg:px-4 flex justify-between">
        <div className="flex flex-col">
          <p>{mood}</p>
          <p>{timestamp}</p>
        </div>
        <div>
          <button onClick={onDelete}>Delete</button> <br />
          <button onClick={onUpdate}>Change</button>
        </div>
      </div>
    </div>
  );
};

export default LoggedMood;

interface Props {
  activity: string;
  description: string;
  onSelect: (activity: string, isSelected: boolean) => void;
}

const PreferredActivity = ({ activity, description, onSelect }: Props) => {
  return (
    <div className="flex justify-between items-end">
      <div>
        <span>{activity}</span>
        <br />
        <span className="text-gray-600">{description}</span>
      </div>
      <input
        type="checkbox"
        name="select"
        id="select"
        onChange={(e) => onSelect(activity, e.target.checked)}
      />
    </div>
  );
};

export default PreferredActivity;

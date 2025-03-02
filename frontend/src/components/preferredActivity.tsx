interface Props {
  activity: string;
  description: string;
  selected: boolean;
}

const PreferredActivity = ({ activity, description, selected }: Props) => {
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
        onChange={() => {
          selected = !selected;
        }}
      />
    </div>
  );
};

export default PreferredActivity;

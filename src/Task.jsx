export default function Task({ task, onDone }) {
  return (
    <tr>
      <td>
        <button onClick={onDone}>Done</button>
      </td>
      <td>{task}</td>
    </tr>
  );
}

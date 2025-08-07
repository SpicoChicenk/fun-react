import BinIcon from "./Bin-Icon";
import TickIcon from "./Tick-Icon";
export default function Task({ task, onDone }) {
  return (
    <tr class='list-item'>
      <td>{task}</td>

      <td>
        <button class='tick'>
          <TickIcon />
        </button>
        <button onClick={onDone} class='bin'>
          <BinIcon />
        </button>
      </td>
    </tr>
  );
}

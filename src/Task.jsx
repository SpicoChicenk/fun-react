import BinIcon from "./Bin-Icon";
import TickIcon from "./Tick-Icon";
export default function Task({ task, onDone }) {
  return (
    <tr class='list-item'>
      <td>{task}</td>

      <td>
        <button>
          <TickIcon />
        </button>
        <button onClick={onDone}>
          <BinIcon />
        </button>
      </td>
    </tr>
  );
}

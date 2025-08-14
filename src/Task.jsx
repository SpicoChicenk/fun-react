import BinIcon from "./Bin-Icon";
import TickIcon from "./Tick-Icon";
export default function Task({ task, onDone, onTick }) {
  return (
    <tr className='list-item'>
      <td>{task.name}</td>
      <td>
        <button onClick={onTick} className='tick' disabled={task.status}>
          <TickIcon />
        </button>
        <button onClick={onDone} className='bin'>
          <BinIcon />
        </button>
      </td>
    </tr>
  );
}

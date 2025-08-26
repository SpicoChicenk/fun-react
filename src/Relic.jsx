import relics from "./data/relics.json";

export default function Relic() {
  // check if local storage has key called relic if it does do not put the value of relic into it
  if (!localStorage.getItem("relic")) {
    localStorage.setItem("relic", JSON.stringify(relics));
    console.log("loadedDefault");
  }
  const relic = JSON.parse(localStorage.getItem("relic"));
  const battleWeaponResource = relic[1].resource;
  const battleWeaponCost = relic[1].cost;
  const handleCheck = () => {
    console.log("click");
  };

  const handleChange = () => {
    console.log("changed");
  };

  return (
    <div>
      <h2>Step One</h2>

      <table className='table-test'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gathered</th>
            <th>Needed</th>
            <th>Done?</th>
          </tr>
        </thead>
        <tbody>
          {relic[0].demiAtma.map((atma) => (
            <tr key={atma.name}>
              <td>{atma.name}</td>
              <td>
                <input
                  onChange={handleChange}
                  type='number'
                  name=''
                  id=''
                  value={atma.amountGathered}
                />
              </td>
              <td>{atma.amountNeeded}</td>
              <td>
                <input
                  type='checkbox'
                  onChange={handleCheck}
                  name=''
                  id=''
                  checked={atma.complete}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>
        Step Two: Every Relic costs {battleWeaponCost} {battleWeaponResource}
      </h2>
      <table className='table-test'>
        <thead>
          <tr>
            <th>Class</th>
            <th>Name</th>
            <th>Done?</th>
          </tr>
        </thead>
        <tbody>
          {relic[1].jobs.map((job) => (
            <tr key={job.class}>
              <td>{job.class}</td>
              <td>{job.name}</td>
              <td>
                <input
                  type='checkbox'
                  onChange={handleCheck}
                  name=''
                  id=''
                  checked={job.complete}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

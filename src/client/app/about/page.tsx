export default function About() {
  return (
    <div>
      <h3>What this is</h3>
      <p>
        This is a map of the systems in the Star Wars galaxy and the hyperlanes
        that connect them. It’s meant as a way to explore the galaxy.
      </p>
      <h3>Why I made this</h3>
      <p>
        As I read and watch Star Wars I enjoy trying to map out the path that
        our heroes are taking and the territory that the factions are fighting
        over. There’s no shortage of maps out there that all provide their own
        benefits, but there are none that I feel are feature-complete. This is
        my attempt to make a detailed map with all the features I always wanted.
      </p>
      <h3>How I made this</h3>
      <p>
        I gathered the initial data for this map from Star Wars: The Essential
        Atlas and Gimp to map the pixel locations of each mapped system. I used
        Wookiepedia to compile all the hyperlanes in the galaxy.
      </p>
      <p>
        The UI for this was built from the ground up as an svg in React using
        Next.js.
      </p>
      <h3>Planned features</h3>
      <ul>
        <li>Zoom</li>
        <li>Drag to move</li>
        <li>
          Versions:
          <ul>
            <li>Legends Clone Wars</li>
            <li>Legends First Galactic Civil War</li>
            <li>Legends Second Galactic Civil War</li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

import "@material/web/chips/chip-set.js";
import "@material/web/chips/assist-chip.js";
import "@material/web/chips/assist-chip.js";
import "@material/web/chips/suggestion-chip.js";
import "@material/web/chips/filter-chip.js";
import "@material/web/switch/switch.js";
import { eventTagList } from "../lists/EventTagsList";
const Filter = (props) => {
  return (
    <div id="duck">
      <span id="filter-secondary-span">Categories:</span>
      <div id="card-horzintal-scroll">
        <div>
          <md-filter-chip
            id="tags-horzintal"
            label="This Week"
          ></md-filter-chip>
          <md-filter-chip
            id="tags-horzintal"
            label="This Month"
          ></md-filter-chip>
          <md-filter-chip
            id="tags-horzintal"
            label="All Events"
          ></md-filter-chip>
        </div>
        {eventTagList.map((eventTag, index) => (
          <md-filter-chip
            id="tags-horzintal"
            key={index}
            label={eventTag.tag}
            elevated
          ></md-filter-chip>
        ))}
      </div>
    </div>
  );
};

export default Filter;

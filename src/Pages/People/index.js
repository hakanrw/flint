import { Route, Routes } from "react-router-dom";
import PersonProfile from "./person";
import PeopleSearch from "./search";

function People() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PeopleSearch />} />
        <Route path="/:username" element={<PersonProfile />} />
      </Routes>
    </div>
  );
}

export default People;
import { Route, Routes } from "react-router-dom";
import PeopleSearch from "./search";

function People() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PeopleSearch />} />
      </Routes>
    </div>
  );
}

export default People;
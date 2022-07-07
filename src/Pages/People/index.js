import { Route, Routes } from "react-router-dom";
import PersonProfile from "./person";
import PostView from "./post";
import PeopleSearch from "./search";

function People() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PeopleSearch />} />
        <Route path="/:username/:postid" element={<PostView />} />
        <Route path="/:username" element={<PersonProfile />} />
      </Routes>
    </div>
  );
}

export default People;
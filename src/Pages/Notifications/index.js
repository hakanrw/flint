import { Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Announcement from "../../Components/Announcement";
import Notification from "../../Components/Notification";
import { supabase } from "../../supabaseClient";

function Notifications() {
  const [notifs, setNotifs] = useState(null);

  const fetchNotifs = () => {
    supabase.rpc("get_notifs").then(data => {
      setNotifs(data.data);
      supabase.rpc("set_notifs_read").then();
    });
  };

  useEffect(() => {
    fetchNotifs();
  }, []);

  if (notifs === null) {
    return (
      <div>
        <Notification loading />
        <Notification loading />
        <Notification loading />
      </div>
    );
  }

  const newNotifs = notifs.filter(notif => !notif.read);
  const readNotifs = notifs.filter(notif => notif.read);

  return (
    <div>
      { notifs.length === 0 && <Announcement message="You have no notifications." /> }
      { newNotifs.length > 0 && 
        <Paper sx={{p: 1, mt: 2}} > 
          <Typography color="primary" variant="h6">New</Typography>
        </Paper> 
      }
      { newNotifs.map(notif => <Notification key={notif.id} {...notif} />) }
      { readNotifs.length > 0 && 
        <Paper sx={{p: 1, mt: 2}} >
          <Typography color="primary" variant="h6">Read</Typography>
        </Paper> 
      }
      { readNotifs.map(notif => <Notification key={notif.id} {...notif} />) }
    </div>
  )
}

export default Notifications;
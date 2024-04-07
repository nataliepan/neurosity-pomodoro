import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useNotion } from "../services/notion";

export function Logout() {
  const navigate = useNavigate();
  const { logoutNotion } = useNotion();

  useEffect(() => {
    logoutNotion().then(() => {
      navigate("/");
    });
  }, [logoutNotion]);

  return null;
}

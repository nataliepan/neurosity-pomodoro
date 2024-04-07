import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useNeurosity } from "../services/notion";

export function Logout() {
  const navigate = useNavigate();
  const { logoutNotion } = useNeurosity();

  useEffect(() => {
    logoutNotion().then(() => {
      navigate("/");
    });
  }, [logoutNotion]);

  return null;
}

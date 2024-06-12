/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import Image from "next/image";
import styles from "./page.module.css";
import * as React from "react";
import { createLists } from "@/services/storageService";
import { ProjectService } from "@/services/projectService";
import { IProject } from "@/types/IProject";
import { StageService } from "@/services/stageService";
import { IStage } from "@/types/IStage";

export default function Home() {

  const createProject = () => {
    const service = new StageService()
    const project: IStage = {
      title: "1209",
      id: "",
      idProject: "66d597ab-c5f7-4732-b77b-2b09534bb2a9",
      stage: 2,
      tasks: [],
      icon: ""
    }
    service.addStage(project)
  }

  return (
    <main className={styles.main}>
      <button onClick={() => createLists()}>teste</button>
      <button onClick={createProject}>treste project</button>
    </main>
  );
}

import * as React from 'react';
import styles from './styles.module.scss';
import { IContentPageProps } from './props';
import { IProject } from '@/types/IProject';
import { sortItemsByCreatedDate, sortItemsByLastVisitedDate } from '@/utils/util';
import ProjectItem from '../commom/projectItem';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function ContentPage(props: IContentPageProps) {
  const [recentlyViewedProjects, setRecentlyViewedProjects] = React.useState<IProject[]>([])
  const [recentlyCreatedProjects, setRecentlyCreatedProjects] = React.useState<IProject[]>([])

  React.useEffect(() => {
    const getRecentlyViewedProjects = () => {
      const rvp = sortItemsByLastVisitedDate(props.projects)

      setRecentlyViewedProjects(rvp)
    }

    const getRecentlyCreatedProjects = () => {
      const rcp = sortItemsByCreatedDate(props.projects)

      setRecentlyCreatedProjects(rcp)
    }

    getRecentlyViewedProjects()
    getRecentlyCreatedProjects()
  }, [props.projects])

  return (
    <div className={styles.contentPage}>
      <h6>Vistos recentemente</h6>
      <div className={styles.contentItems}>
        <Slider
          dots={false}
          infinite={false}
          speed={500}
          slidesToShow={4}
          slidesToScroll={4}
        >
          {recentlyViewedProjects.map(p => (
            <ProjectItem key={p.id} project={p} />
          ))}
        </Slider>
      </div>
      <h6>Criados recentemente</h6>
      <div className={styles.contentItems}>
        <Slider
          dots={false}
          infinite={false}
          speed={500}
          slidesToShow={4}
          slidesToScroll={4}
        >
          {recentlyCreatedProjects.map(p => (
            <ProjectItem key={p.id} project={p} />
          ))}
        </Slider>
      </div>
    </div>
  )
}
import * as React from 'react';
import styles from './styles.module.scss';
import { IContentPageProps } from './props';
import { IProject } from '@/types/IProject';
import { sortItemsByCreatedDate, sortItemsByLastVisitedDate } from '@/utils/util';
import ProjectItem from '../commom/projectItem';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useSelector } from 'react-redux';
import { lastVisitedHome } from '@/services/storageService';

export default function ContentPage(props: IContentPageProps) {
  const [recentlyViewedProjects, setRecentlyViewedProjects] = React.useState<IProject[]>([])
  const [recentlyCreatedProjects, setRecentlyCreatedProjects] = React.useState<IProject[]>([])
  const projects = useSelector((s: any) => s.projectsReducer)
  const folders = useSelector((s: any) => s.foldersReducer)

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
  }, [projects, folders])

  return (
    <div className={styles.contentPage}>
      <h6>Vistos recentemente</h6>
      <div className={styles.contentItems}>
        {recentlyViewedProjects.length > 5 ?
          <Slider
            dots={false}
            infinite={false}
            speed={500}
            slidesToShow={5}
            slidesToScroll={5}
          >
            {recentlyViewedProjects.map(p => (
              <ProjectItem key={p.id} project={p} />
            ))}
          </Slider>
          :
          <div className={styles.contentItemsFlex}>
            {recentlyViewedProjects.map(p => (
              <ProjectItem key={p.id} project={p} style={{ maxWidth: '179.4px' }} />
            ))}
          </div>
        }
      </div>
      <h6>Criados recentemente</h6>
      <div className={styles.contentItems}>
        {recentlyCreatedProjects.length > 5 ?
          <Slider
            dots={false}
            infinite={false}
            speed={500}
            slidesToShow={5}
            slidesToScroll={5}
          >
            {recentlyCreatedProjects.map(p => (
              <ProjectItem key={p.id} project={p} />
            ))}
          </Slider>
          :
          <div className={styles.contentItemsFlex}>
            {recentlyCreatedProjects.map(p => (
              <ProjectItem key={p.id} project={p} style={{ maxWidth: '179.4px' }} />
            ))}
          </div>
        }
      </div>
    </div>
  )
}
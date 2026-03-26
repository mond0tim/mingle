// 'use client';
// import { usePlayer } from '@/context/PlayerContext';
// import { initialPlaylists } from '@/lib/data';
// import PlayPlaylistIcon from '@/public/icons/PlayPlaylistIcon.svg';
// import PausePlaylistIcon from '@/public/icons/PausePlaylistIcon.svg';
// import styles from './Page.module.css'
// import TrackList from '@/components/TrackList/TrackList';
// import Image from 'next/image';
// import { Button } from '@/components/Button/Button';
// import { useEffect, useState, useRef } from 'react';
// import ColorThief from 'colorthief';


import RepeatTextScroll from '@/components/RepeatTextScroll/RepeatTextScroll';
import { Metadata } from 'next';
import cn from 'classnames'
import styles from './page.module.css'
import LogoIcon from '@/public/icons/LogoIcon.svg'
import LogoText from '@/public/icons/LogoText.svg'
import InstallPWA from '@/components/pwa/Install';
import { format } from 'date-fns';
import Image from 'next/image';

export const metadata: Metadata = {
	title: 'О нас',
	description: 'как был создан музыкальный плеер',
  }
  

export default function AboutPage () {

  return (
    <div className='p-5 md:ps-52 pr-4'>
      <div className={styles.gradient}></div>
		<h1 className={styles.title}>о проекте</h1>
    <h2 className={styles.subTitle}>Mingle: Гармония Звука и Визуала</h2>

<p className={styles.text}>
Этот проект был создан как демонстрационная веб-версия музыкального плеера, который стал кейсом в портфолио студии TI Web. Основной акцент сделан на визуальное восприятие музыки, а сама атмосфера плеера передаёт особый вайб — именно поэтому было выбрано название Mingle, что в переводе с английского означает «смешиваться, общаться». Это слово идеально отражает суть проекта: взаимодействие звука и визуала, гармоничное сочетание технологий и дизайна.
</p>

<p className={styles.text}>
Mingle поддерживает PWA, позволяя устанавливать плеер как приложение, и предлагает удобный и красивый интерфейс. Весь код находится в открытом доступе на GitHub, так что каждый может изучить его и использовать в своих проектах. 
Проект сознательно остался компактным: это не монолит вроде Spotify, важно помнить, что целью разработчика не было создание полноценного, коммерческого музыкального плеера. Mingle — это прежде всего демонстрация возможностей, эксперимент, призванный показать, каким красивым, удобным и технологичным может быть веб-приложение.

И с этой задачей Mingle справился превосходно. Он стал не просто строчкой в портфолио, а прекрасным проектом, который отлично выполняет свою главную задачу — погружать пользователя в музыку с помощью эффектного визуала и плавного интерфейса.


</p>
<h2 className={styles.subTitle}>Визуализация и дизайн</h2>
<p className={styles.text}>
Дизайн Mingle вдохновлён самой музыкой: плавные анимации, фиолетовая палитра и её оттенки создают атмосферу, в которой хочется остаться. Каждый элемент интерфейса тщательно продуман и адаптирован для комфортного использования. Минимализм в сочетании с динамическими эффектами создаёт ощущение лёгкости и гармонии.
</p>

<p className={styles.text}>
Одной из ключевых особенностей Mingle является функция визуализации для плейлистов, названная &quot;Вайб&quot;. Она представляет собой динамически генерируемые абстрактные формы и цветовые переходы, синхронизированные с воспроизводимой музыкой. Это реализовано с помощью библиотек для работы с web audio и canvas API для отрисовки графики под бит трека, создавая уникальный опыт для каждого прослушивания. 
</p>
<p className={styles.text}>
Шрифты в Mingle также играют важную роль. Используются современные, легко читаемые гарнитуры, такие как Geist и Oddval, которые гармонично сочетаются с общей стилистикой проекта. Их плавные линии и сбалансированные пропорции дополняют визуальную эстетику, обеспечивая комфортное восприятие контента.
</p>
<p  className={cn(styles.text, 'text-center font-oddval')}>
  <strong>Эстетика, плавность, интерактивность — вот три ключевых принципа, которые легли в основу разработки.</strong>
</p>

    <RepeatTextScroll>
  <div className={styles.svg_group} ><LogoIcon/><LogoText/></div>
</RepeatTextScroll>
<h2 className={styles.subTitle}>Почему Next.js?</h2>
<p className={styles.text}>
Выбор фреймворка Next.js для разработки Mingle не случаен. Он обеспечил проекту высокую производительность, оптимизацию для поисковых систем (SEO) и простоту разработки. Server-Side Rendering (SSR) позволил добиться мгновенной загрузки страниц, что особенно важно для веб-приложений. Кроме того, Next.js предоставил удобные инструменты для маршрутизации, управления состоянием и работы с данными, что значительно ускорило процесс разработки.
</p>
<p className={styles.text}>

Использование React-компонентов вместе с возможностями Next.js позволило добиться высокой скорости загрузки и плавного рендеринга. Благодаря этим технологиям Mingle получился лёгким, быстрым и отзывчивым, сохраняя при этом эстетичность и удобство.
</p>

<h2 className={styles.subTitle}>
Прогрессивное Веб-Приложение (PWA)
</h2>
<p className={styles.text}>
Mingle реализован как Progressive Web App (PWA). Это дает следующие преимущества:
</p>
<ul className={styles.ul}>
<li>
Офлайн-доступ: Благодаря использованию Service Workers и кэшированию, плеер может функционировать частично даже при отсутствии интернет-соединения.
</li> 
 <li>
Установка на главный экран: Пользователь может добавить Mingle на главный экран своего устройства, как обычное нативное приложение.
</li>
<li>
Push-уведомления: В данном проекте функционал push-уведомлений не реализован, но PWA предоставляет такую возможность.
</li>
<li>
Быстрая загрузка: PWA оптимизированы для быстрой загрузки и плавной работы, что улучшает пользовательский опыт.
</li>
</ul>

<p className={styles.text}>
  Попробуйте установить Mingle как PWA:
</p>
<InstallPWA/>
<br/><br/>
<h2 className={styles.subTitle}>
  Итог всего вышесказанного
</h2>
<p className={styles.text}>
Конечно, Mingle еще есть куда расти. В проекте присутствуют некоторые недоработки, которые предстоит устранить в будущем.
<br/>
 Однако важно помнить, что целью разработчика не было создание полноценного, коммерческого музыкального плеера. Mingle — это прежде всего демонстрация возможностей, эксперимент, призванный показать,  как можно реализовать ключевые функции плеера с красивой и удобной визуальной оболочкой.
</p>
<h2 className={styles.subTitle}>
Больше от автора
</h2>
<p className={styles.text}>
Этот плеер — лишь один из проектов в портфолио mondotim, разработчика tiweb. Если вас заинтересовал наш подход, загляните в другие работы, почитайте статью в блоге о некоторых тонкостях создания Mingle или сразу напишите на <a className={styles.a} href='mailto:mondotim@ti-web.ru'>mondotim@ti-web.ru</a> — будем создавать крутые проекты вместе!
</p>

<footer className={styles.footer}>
  <div>
Mingle © 2024 - {format(new Date(), 'yyyy')}. Все права защищены.
</div>
<a href='https://ti-web.ru'>
<Image src='/logoti.png' alt={'tiweb logo'} width={50} height={50}/>
</a>
</footer>

</div>
  );
};

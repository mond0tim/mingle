"use server only"
import { Track, Playlist } from "../types";


export const initialTracks: Track[] = [
  {
    id: 0,
    title: "Mingle",
    artist: "mondotim",
    src: "/audio/mingle.mp3",
    cover: "/covers/mingle.png",
    fullSrc: "/audio/mingle.mp3",
    type: "track"
  },
  {
    id: 1,
    title: "The Line (from the series Arcane League of Legends)",
    artist: "twenty one pilots, Arcane, Legue of Legends",
    src: "/audio/track1.mp3",
    cover: "/covers/cover1.jpg",
    fullSrc: "/audio/track1.mp3",
    type: "track"
  },
  {
    id: 2,
    title: "Imagine Dragons",
    artist: "Ragged Insomnia",
    src: "/audio/track2.mp3",
    cover: "/covers/cover2.jpg",
    fullSrc: "/audio/track2.mp3",
    type: "track"
  },
  {
    id: 3,
    title: "Тантум Верде Форте",
    artist: "Тимати",
    src: "/audio/track3.mp3",
    cover: "/covers/cover3.jpg",
    fullSrc: "/audio/track3.mp3",
    type: "track"
  },
  {
    id: 4,
    title: "Sunflower - Spider-'Man': Into the Spider-Verce",
    artist: "Post Malone, Swae Lee",
    src: "/audio/track4.mp3",
    cover: "/covers/cover4.jpg",
    fullSrc: "/audio/track4.mp3",
    color: "#000000",
    type: "track"
  },
  {
    id: 5,
    title: "Faint",
    artist: "Linkin Park",
    src: "/audio/track5.mp3",
    cover: "/covers/cover5.jpg",
    fullSrc: "/audio/track5.mp3",
    type: "track"
  },
  {
    id: 6,
    title: "Sound 07380",
    artist: "unkown",
    src: "/audio/7380 (1).mp3",
    fullSrc: "/audio/7380 (1).mp3",
    cover: "/covers/sound-icon.png",
    type: "track"
  },
  {
    id: 7,
    title: "Astronaut In The Ocean",
    artist: "Masked Wolf",
    src: "/audio/Astronaut In The Ocean.mp3",
    fullSrc: "/audio/Astronaut In The Ocean.mp3",
    cover: "/covers/Astronaut In The Ocean.jpg",
    type: "track"
  },
  {
    id: 8,
    title: "Come Play (from the series Arcane League of Legends)",
    artist: "Stray Kids, Arcane, Legaue of Legends",
    src: "/audio/Come_play.mp3",
    fullSrc: "/audio/Come_play.mp3",
    cover: "/covers/cover1.jpg",
    type: "track"
  },
  {
    id: 9,
    title: "Bang Bang - New Version",
    artist: "K'naan",
    src: "/audio/bang bang.mp3",
    fullSrc: "/audio/bang bang.mp3",
    cover: "/covers/bang bang.jpg",
    type: "track"
  },
  {
    id: 10,
    title: "bad guy",
    artist: "Billie Eilish",
    src: "/audio/bad guy.mp3",
    fullSrc: "/audio/bad guy.mp3",
    cover: "/covers/bad guy.jpg",
    type: "track"
  },
  {
    id: 11,
    title: "Blinding Lights",
    artist: "The Weeknd",
    src: "/audio/Blinding Lights.mp3",
    fullSrc: "/audio/Blinding Lights.mp3",
    cover: "/covers/Blinding Lights.png",
    type: "track"
  },
  {
    id: 12,
    title: "Broken Neon Love",
    artist: "unkown",
    src: "/audio/Broken Neon Love.mp3",
    fullSrc: "/audio/Broken Neon Love.mp3",
    cover: "/covers/Broken Neon Love.jpg",
    type: "track"
  },
  {
    id: 13,
    title: "Eyes Closed",
    artist: "Imagine Dragons",
    src: "/audio/Eyes Closed - Imagine Dragons.m4a",
    fullSrc: "/audio/Eyes Closed - Imagine Dragons.m4a",
    cover: "/covers/Eyes Closed - Imagine Dragons.jpg",
    type: "track"
  },
  {
    id: 14,
    title: "Heavydirtysoul",
    artist: "twenty one pilots",
    src: "/audio/Heavydirtysoul.mp3",
    fullSrc: "/audio/Heavydirtysoul.mp3",
    cover: "/covers/Heavydirtysoul.jpg",
    type: "track"
  },
  {
    id: 15,
    title: "What's Up Danger",
    artist: "Blackway, Black Caviar",
    src: "/audio/Blackway, Black Caviar - What's Up Danger.mp3",
    fullSrc: "/audio/Blackway, Black Caviar - What's Up Danger.mp3",
    cover: "/covers/cover4.jpg",
    color: "#000000",
    type: "track"
  },
  {
    id: 16,
    title: "LALALALA (Rock Ver.)",
    artist: "Stray Kids",
    src: "/audio/LALALALA (Rock Ver.).mp3",
    fullSrc: "/audio/LALALALA (Rock Ver.).mp3",
    cover: "/covers/LALALALA (Rock Ver.).jpg",
    type: "track"
  },
  {
    id: 17,
    title: "Nice to Meet You",
    artist: "Imagine Dragons",
    src: "/audio/Nice to Meet You.mp3",
    fullSrc: "/audio/Nice to Meet You.mp3",
    cover: "/covers/Nice to Meet You.jpg",
    type: "track"
  },
  {
    id: 18,
    title: "Natural",
    artist: "Imagine Dragons",
    src: "/audio/Natural.mp3",
    fullSrc: "/audio/Natural.mp3",
    cover: "/covers/Natural.jpg",
    type: "track"
  },
  {
    id: 19,
    title: "Overcompensate",
    artist: "twenty one pilots",
    src: "/audio/Overcompensate.mp3",
    fullSrc: "/audio/Overcompensate.mp3",
    cover: "/covers/Overcompensate.jpg",
    type: "track",
    color: "#4C0000"
  },
  {
    id: 20,
    title: "Smells Like Teen Spirit",
    artist: "Nirvana",
    src: "/audio/Smells Like Teen Spirit.mp3",
    fullSrc: "/audio/Smells Like Teen Spirit.mp3",
    cover: "/covers/Smells Like Teen Spirit.jpg",
    type: "track"
  },
  {
    id: 21,
    title: "Way Up",
    artist: "Jaden Smith",
    src: "/audio/Way_Up.m4a",
    fullSrc: "/audio/Way_Up.m4a",
    cover: "/covers/cover4.jpg",
    color: "#000000",
    type: "track"
  },
  {
    id: 22,
    title: "Sugar",
    artist: "Maroon 5",
    src: "/audio/Sugar.mp3",
    fullSrc: "/audio/Sugar.mp3",
    cover: "/covers/Sugar.jpg",
    type: "track"
  },
  {
    id: 23,
    title: "Navigating",
    artist: "twenty one pilots",
    src: "/audio/Twenty One Pilots - Navigating.mp3",
    fullSrc: "/audio/Twenty One Pilots - Navigating.mp3",
    cover: "/covers/Twenty One Pilots - Navigating.jpg",
    type: "track",
    color: "#4C0000"
  },
  {
    id: 24,
    title: "Голуби счастья",
    artist: "общество",
    src: "/audio/Голуби счастья (1).mp3",
    fullSrc: "/audio/Голуби счастья (1).mp3",
    cover: "/covers/Голуби счастья (1).jpg",
    type: "track"
  },
  {
    id: 25,
    title: "Горы Казахстана",
    artist: "анонимное горное сообщество",
    src: "/audio/Горы Казахстана.mp3",
    fullSrc: "/audio/Горы Казахстана.mp3",
    cover: "/covers/Горы Казахстана.jpg",
    type: "track"
  },
  {
    id: 26,
    title: "Tokyo Drifting",
    artist: "Glass Animals",
    src: "/audio/Tokyo Drifting - Glass Animals.m4a",
    fullSrc: "/audio/Tokyo Drifting - Glass Animals.m4a",
    cover: "/covers/Tokyo Drifting.jpg",
    type: "track"
  },
  {
    id: 27,
    title: "Сладкая жизнь Маша и Медведь",
    artist: "СВУДИ",
    src: "/audio/Сладкая_жизнь_СВУДИ Маша_и_Медведь.mp3",
    fullSrc: "/audio/Сладкая_жизнь_СВУДИ Маша_и_Медведь.mp3",
    cover: "/covers/Сладкая_жизнь_СВУДИ Маша_и_Медведь.jpg",
    type: "track"
  },
  {
    id: 28,
    title: "Big Dawgs",
    artist: "Hanumankind, Kalmi",
    src: "/audio/Big Dawgs - Hanumankind   Kalmi.m4a",
    fullSrc: "/audio/Big Dawgs - Hanumankind   Kalmi.m4a",
    cover: "/covers/Big_Dawgs _-_Hanumankind_Kalmi.jpg",
    type: "track"
  },
  {
    id: 29,
    title: "Lane Boy",
    artist: "twenty one pilots",
    src: "/audio/Lane_Boy.mp3",
    fullSrc: "/audio/Lane_Boy.mp3",
    cover: "/covers/Heavydirtysoul.jpg",
    type: "track"
  },
  {
    id: 30,
    title: "Jerk it out",
    artist: "Caesars Palace",
    src: "/audio/caesars_palace_-_jerk_it_out.mp3",
    fullSrc: "/audio/caesars_palace_-_jerk_it_out.mp3",
    cover: "/covers/caesars_palace_-_jerk_it_out.jpg",
    type: "track"
  },
  {
    id: 31,
    title: "Heat Waves",
    artist: "Glass Animals",
    src: "/audio/Glass_Animals_-_Heat_Waves.mp3",
    fullSrc: "/audio/Glass_Animals_-_Heat_Waves.mp3",
    cover: "/covers/Glass_Animals_-_Heat_Waves.jpg",
    type: "track"
  },
  {
    id: 32,
    title: "Next Semester",
    artist: "twenty one pilots",
    src: "/audio/Next Semester - twenty one pilots.m4a",
    fullSrc: "/audio/Next Semester - twenty one pilots.m4a",
    cover: "/covers/Twenty One Pilots - Navigating.jpg",
    type: "track",
    color: "#4C0000"
  },
  {
    id: 33,
    title: "Backslide",
    artist: "twenty one pilots",
    src: "/audio/Backslide.mp3",
    fullSrc: "/audio/Backslide.mp3",
    cover: "/covers/Twenty One Pilots - Navigating.jpg",
    type: "track",
    color: "#4C0000"
  },
  {
    id: 34,
    title: "Midwest Indigo",
    artist: "twenty one pilots",
    src: "/audio/Midvest_Indigo.mp3",
    fullSrc: "/audio/Midvest_Indigo.mp3",
    cover: "/covers/Twenty One Pilots - Navigating.jpg",
    type: "track",
    color: "#4C0000"
  },
  {
    id: 35,
    title: "Routines in the Night",
    artist: "twenty one pilots",
    src: "/audio/Routines in the Night.mp3",
    fullSrc: "/audio/Routines in the Night.mp3",
    cover: "/covers/Twenty One Pilots - Navigating.jpg",
    type: "track",
    color: "#4C0000"
  },
  {
    id: 36,
    title: "Vignette",
    artist: "twenty one pilots",
    src: "/audio/Vignette.mp3",
    fullSrc: "/audio/Vignette.mp3",
    cover: "/covers/Twenty One Pilots - Navigating.jpg",
    type: "track",
    color: "#4C0000"
  },
  {
    id: 37,
    title: "The Craving (Jenna's Version)",
    artist: "twenty one pilots",
    src: "/audio/The Craving (Jenna's Version).mp3",
    fullSrc: "/audio/The Craving (Jenna's Version).mp3",
    cover: "/covers/Twenty One Pilots - Navigating.jpg",
    type: "track",
    color: "#4C0000"
  },
  {
    id: 38,
    title: "Lavish",
    artist: "twenty one pilots",
    src: "/audio/Lavish.mp3",
    fullSrc: "/audio/Lavish.mp3",
    cover: "/covers/Twenty One Pilots - Navigating.jpg",
    type: "track",
    color: "#4C0000"
  },
  {
    id: 39,
    title: "Snap Back",
    artist: "twenty one pilots",
    src: "/audio/Snap Back.mp3",
    fullSrc: "/audio/Snap Back.mp3",
    cover: "/covers/Twenty One Pilots - Navigating.jpg",
    type: "track",
    color: "#4C0000"
  },
  {
    id: 40,
    title: "Oldies Station",
    artist: "twenty one pilots",
    src: "/audio/Oldies Station.mp3",
    fullSrc: "/audio/Oldies Station.mp3",
    cover: "/covers/Twenty One Pilots - Navigating.jpg",
    type: "track",
    color: "#4C0000"
  },
  {
    id: 41,
    title: "At the Risk of Feeling Dumb",
    artist: "twenty one pilots",
    src: "/audio/At the Risk of Feeling Dumb.mp3",
    fullSrc: "/audio/At the Risk of Feeling Dumb.mp3",
    cover: "/covers/Twenty One Pilots - Navigating.jpg",
    type: "track",
    color: "#4C0000"
  },
  {
    id: 42,
    title: "Paladin Strait",
    artist: "twenty one pilots",
    src: "/audio/Paladin Strait.mp3",
    fullSrc: "/audio/Paladin Strait.mp3",
    cover: "/covers/Twenty One Pilots - Navigating.jpg",
    type: "track",
    color: "#4C0000"
  },
  {
    id: 43,
    title: "MOUNTAINS",
    artist: "Stray Kids",
    src: "/audio/MOUNTAINS - Stray Kids.mp3",
    fullSrc: "/audio/MOUNTAINS - Stray Kids.mp3",
    cover: "/covers/ATE.jpg",
    type: "track"
  },
  {
    id: 44,
    title: "Chk Chk Boom",
    artist: "Stray Kids",
    src: "/audio/Stray Kids - Chk Chk Boom.mp3",
    fullSrc: "/audio/Stray Kids - Chk Chk Boom.mp3",
    cover: "/covers/ATE.jpg",
    type: "track"
  },
  {
    id: 45,
    title: "JJAM",
    artist: "Stray Kids",
    src: "/audio/Stray Kids - JJAM.mp3",
    fullSrc: "/audio/Stray Kids - JJAM.mp3",
    cover: "/covers/ATE.jpg",
    type: "track"
  },
  {
    id: 46,
    title: "I Like It",
    artist: "Stray Kids",
    src: "/audio/I Like It_y_Oz7v7TP_-3k.mp3",
    fullSrc: "/audio/I Like It_y_Oz7v7TP_-3k.mp3",
    cover: "/covers/ATE.jpg",
    type: "track"
  },
  {
    id: 47,
    title: "Runners",
    artist: "Stray Kids",
    src: "/audio/Runners.mp3",
    fullSrc: "/audio/Runners.mp3",
    cover: "/covers/ATE.jpg",
    type: "track"
  },
  {
    id: 48,
    title: "twilight",
    artist: "Stray Kids",
    src: "/audio/twilight.m4a",
    fullSrc: "/audio/twilight.m4a",
    cover: "/covers/ATE.jpg",
    type: "track"
  },
  {
    id: 49,
    title: "Stray Kids",
    artist: "Stray Kids",
    src: "/audio/Stray Kids - Stray Kids.mp3",
    fullSrc: "/audio/Stray Kids - Stray Kids.mp3",
    cover: "/covers/ATE.jpg",
    type: "track"
  },
  {
    id: 50,
    title: "Chk Chk Boom (Festival Ver.)",
    artist: "Stray Kids",
    src: "/audio/Chk_Chk_Boom_Festival_Ver.m4a",
    fullSrc: "/audio/Chk_Chk_Boom_Festival_Ver.m4a",
    cover: "/covers/ATE.jpg",
    type: "track"
  },
  {
    id: 51,
    title: "Lose My Breath (Feat. Charlie Puth)",
    artist: "Stray Kids, Charlie Puth",
    src: "/audio/2_5327769766612453052.mp3",
    fullSrc: "/audio/2_5327769766612453052.mp3",
    cover: "/covers/Lose_My_Breath.jpg",
    type: "track"
  },
  {
    id: 52,
    title: "Skinny Loser",
    artist: "Sub Urban",
    src: "/audio/Skinny Loser - Sub Urban.m4a",
    fullSrc: "/audio/Skinny Loser - Sub Urban.m4a",
    cover: "/covers/Skinny Loser - Sub Urban.png",
    type: "track"
  },
  {
    id: 53,
    title: "Can't Stop",
    artist: "Red Hot Chili Peppers",
    src: "/audio/Red_Hot_Chili_Peppers_-_Cant_Stop_47829176.mp3",
    fullSrc: "/audio/Red_Hot_Chili_Peppers_-_Cant_Stop_47829176.mp3",
    cover: "/covers/Cant Stop.jpg",
    type: "track"
  },
  {
    id: 54,
    title: "PARANOIA",
    artist: "HEARTSTEEL, BAEKHYUN, tobi lou, ZI & Cal Scruby",
    src: "/audio/HEARTSTEEL,_League_of_Legends,_BAEKHYUN,_tobi_lou,_ØZI,_Cal_Scru.mp3",
    fullSrc: "/audio/HEARTSTEEL,_League_of_Legends,_BAEKHYUN,_tobi_lou,_ØZI,_Cal_Scru.mp3",
    cover: "/covers/HEARTSTEEL.jpg",
    type: "track"
  },
  {
    id: 55,
    title: "SPOT!",
    artist: "ZICO (feat. JENNIE)",
    src: "/audio/ZICO_feat_JENNIE_-_SPOT_77830308.mp3",
    fullSrc: "/audio/ZICO_feat_JENNIE_-_SPOT_77830308.mp3",
    cover: "/covers/SPOT.jpg",
    type: "track"
  },
  {
    id: 56,
    title: "Wake Up",
    artist: "Imagine Dragons",
    src: "/audio/Wake Up.mp3",
    fullSrc: "/audio/Wake Up.mp3",
    cover: "/covers/Eyes Closed - Imagine Dragons.jpg",
    type: "track"
  },
  {
    id: 57,
    title: "Brainstorm",
    artist: "Artic Monkeys",
    src: "/audio/brainstorm.mp3",
    fullSrc: "/audio/brainstorm.mp3",
    cover: "/covers/brainstorm.jpg",
    type: "track"
  },
  {
    id: 58,
    title: "Teddy Picker",
    artist: "Arctic Monkeys",
    src: "/audio/Teddy Picker.mp3",
    fullSrc: "/audio/Teddy Picker.mp3",
    cover: "/covers/brainstorm.jpg",
    type: "track"
  },
  {
    id: 59,
    title: "D is for Dangerous",
    artist: "Arctic Monkeys",
    src: "/audio/Arctic_Monkeys_-_D_is_for_Dangerous_59891375.mp3",
    fullSrc: "/audio/Arctic_Monkeys_-_D_is_for_Dangerous_59891375.mp3",
    cover: "/covers/Arctic_Monkeys_-_D_is_for_Dangerous_59891375.jpeg",
    type: "track"
  },
  {
    id: 60,
    title: "505",
    artist: "Arctic Monkeys",
    src: "/audio/Arctic_Monkeys_-_505_75941075.mp3",
    fullSrc: "/audio/Arctic_Monkeys_-_505_75941075.mp3",
    cover: "/covers/Arctic_Monkeys_-_505_75941075.jpeg",
    type: "track"
  },
  {
    id: 61,
    title: "Balaclava",
    artist: "Arctic Monkeys",
    src: "/audio/Arctic_Monkeys_-_Balaclava_59891377.mp3",
    fullSrc: "/audio/Arctic_Monkeys_-_Balaclava_59891377.mp3",
    cover: "/covers/Arctic_Monkeys_-_Balaclava_59891377.jpeg",
    type: "track"
  },
  {
    id: 62,
    title: "Do Me a Favour",
    artist: "Arctic Monkeys",
    src: "/audio/Arctic_Monkeys_-_Do_Me_a_Favour_59891380.mp3",
    fullSrc: "/audio/Arctic_Monkeys_-_Do_Me_a_Favour_59891380.mp3",
    cover: "/covers/Arctic_Monkeys_-_Do_Me_a_Favour_59891380.jpeg",
    type: "track"
  },
  {
    id: 63,
    title: "Fluorescent Adolescent",
    artist: "Arctic Monkeys",
    src: "/audio/Arctic_Monkeys_-_Fluorescent_Adolescent_59891378.mp3",
    fullSrc: "/audio/Arctic_Monkeys_-_Fluorescent_Adolescent_59891378.mp3",
    cover: "/covers/Arctic_Monkeys_-_Fluorescent_Adolescent_59891378.jpeg",
    type: "track"
  },
  {
    id: 64,
    title: "If You Were There, Beware",
    artist: "Arctic Monkeys",
    src: "/audio/Arctic_Monkeys_-_If_You_Were_There_Beware_59891384.mp3",
    fullSrc: "/audio/Arctic_Monkeys_-_If_You_Were_There_Beware_59891384.mp3",
    cover: "/covers/Arctic_Monkeys_-_If_You_Were_There_Beware_59891384.jpeg",
    type: "track"
  },
  {
    id: 65,
    title: "I Bet You Look Good On The Dancefloor",
    artist: "Arctic Monkeys",
    src: "/audio/Arctic_Monkeys_-_I_Bet_You_Look_Good_On_The_Dancefloor_59891390.mp3",
    fullSrc: "/audio/Arctic_Monkeys_-_I_Bet_You_Look_Good_On_The_Dancefloor_59891390.mp3",
    cover: "/covers/Arctic_Monkeys_-_I_Bet_You_Look_Good_On_The_Dancefloor_59891390.jpeg",
    type: "track"
  },
  {
    id: 66,
    title: "Old Yellow Bricks",
    artist: "Arctic Monkeys",
    src: "/audio/Arctic_Monkeys_-_Old_Yellow_Bricks_59891386.mp3",
    fullSrc: "/audio/Arctic_Monkeys_-_Old_Yellow_Bricks_59891386.mp3",
    cover: "/covers/Arctic_Monkeys_-_Old_Yellow_Bricks_59891386.jpeg",
    type: "track"
  },
  {
    id: 67,
    title: "Only Ones Who Know",
    artist: "Arctic Monkeys",
    src: "/audio/Arctic_Monkeys_-_Only_Ones_Who_Know_59891379.mp3",
    fullSrc: "/audio/Arctic_Monkeys_-_Only_Ones_Who_Know_59891379.mp3",
    cover: "/covers/Arctic_Monkeys_-_Only_Ones_Who_Know_59891379.jpeg",
    type: "track"
  },
  {
    id: 68,
    title: "The Bad Thing",
    artist: "Arctic Monkeys",
    src: "/audio/Arctic_Monkeys_-_The_Bad_Thing_59891385.mp3",
    fullSrc: "/audio/Arctic_Monkeys_-_The_Bad_Thing_59891385.mp3",
    cover: "/covers/Arctic_Monkeys_-_The_Bad_Thing_59891385.jpeg",
    type: "track"
  },
  {
    id: 69,
    title: "This House is a Circus",
    artist: "Arctic Monkeys",
    src: "/audio/Arctic_Monkeys_-_This_House_is_a_Circus_59891383.mp3",
    fullSrc: "/audio/Arctic_Monkeys_-_This_House_is_a_Circus_59891383.mp3",
    cover: "/covers/Arctic_Monkeys_-_This_House_is_a_Circus_59891383.jpeg",
    type: "track"
  },
  {
    id: 70,
    title: "Grace Kelly",
    artist: "Mika",
    src: "/audio/Mika_-_Grace_Kelly_47997867.mp3",
    fullSrc: "/audio/Mika_-_Grace_Kelly_47997867.mp3",
    cover: "/covers/Mika_-_Grace_Kelly_47997867.jpeg",
    type: "track"
  },
  {
    id: 71,
    title: "Dont Forget Me",
    artist: "Imagine Dragons",
    src: "/audio/Imagine_Dragons_-_Dont_Forget_Me_2024_78247870.mp3",
    fullSrc: "/audio/Imagine_Dragons_-_Dont_Forget_Me_2024_78247870.mp3",
    cover: "/covers/playlists/loom.jpg",
    type: "track"
  },
  {
    id: 72,
    title: "Fire In These Hills",
    artist: "Imagine Dragons",
    src: "/audio/Imagine_Dragons_-_Fire_In_These_Hills_78053168.mp3",
    fullSrc: "/audio/Imagine_Dragons_-_Fire_In_These_Hills_78053168.mp3",
    cover: "/covers/playlists/loom.jpg",
    type: "track"
  },
  {
    id: 73,
    title: "Gods Dont Pray",
    artist: "Imagine Dragons",
    src: "/audio/Imagine_Dragons_-_Gods_Dont_Pray_78053183.mp3",
    fullSrc: "/audio/Imagine_Dragons_-_Gods_Dont_Pray_78053183.mp3",
    cover: "/covers/playlists/loom.jpg",
    type: "track"
  },
  {
    id: 74,
    title: "In Your Corner",
    artist: "Imagine Dragons",
    src: "/audio/Imagine_Dragons_-_In_Your_Corner_78053144.mp3",
    fullSrc: "/audio/Imagine_Dragons_-_In_Your_Corner_78053144.mp3",
    cover: "/covers/playlists/loom.jpg",
    type: "track"
  },
  {
    id: 75,
    title: "Kid",
    artist: "Imagine Dragons",
    src: "/audio/Imagine_Dragons_-_Kid_78053158.mp3",
    fullSrc: "/audio/Imagine_Dragons_-_Kid_78053158.mp3",
    cover: "/covers/playlists/loom.jpg",
    type: "track"
  },
  {
    id: 76,
    title: "Take Me To The Beach",
    artist: "Imagine Dragons",
    src: "/audio/Imagine_Dragons_-_Take_Me_To_The_Beach_78072581.mp3",
    fullSrc: "/audio/Imagine_Dragons_-_Take_Me_To_The_Beach_78072581.mp3",
    cover: "/covers/playlists/loom.jpg",
    type: "track"
  },
  {
    id: 77,
    title: "Eyes Closed",
    artist: "Imagine Dragons feat. J Balvin",
    src: "/audio/Imagine_Dragons_feat_J_Balvin_-_Eyes_Closed_77825006.mp3",
    fullSrc: "/audio/Imagine_Dragons_feat_J_Balvin_-_Eyes_Closed_77825006.mp3",
    cover: "/covers/playlists/loom.jpg",
    type: "track"
  },
  {
    id: 78,
    title: "Nice to Meet You",
    artist: "Imagine Dragons",
    src: "/audio/Nice to Meet You.mp3",
    fullSrc: "/audio/Nice to Meet You.mp3",
    cover: "/covers/playlists/loom.jpg",
    type: "track"
  },
  {
    id: 79,
    title: "Были танцы",
    artist: "Бьянка",
    src: "/audio/Byanka_-_Byli_tancy_72332693.mp3",
    fullSrc: "/audio/Byanka_-_Byli_tancy_72332693.mp3",
    cover: "/covers/Byanka_-_Byli_tancy_72332693.jpeg",
    type: "track"
  },
  {
    id: 80,
    title: "140",
    artist: "IOWA",
    src: "/audio/IOWA - 140.mp3",
    fullSrc: "/audio/IOWA - 140.mp3",
    cover: "/covers/IOWA - 140.png",
    type: "track"
  },
  {
    id: 81,
    title: "Плохо танцевать",
    artist: "IOWA",
    src: "/audio/IOWA - Плохо танцевать.mp3",
    fullSrc: "/audio/IOWA - Плохо танцевать.mp3",
    cover: "/covers/IOWA - Плохо танцевать.png",
    type: "track"
  },
  {
    id: 82,
    title: "Яблоко",
    artist: "IOWA, Ёлка",
    src: "/audio/IOWA_JOlka_-_YAbloko_73061728.mp3",
    fullSrc: "/audio/IOWA_JOlka_-_YAbloko_73061728.mp3",
    cover: "/covers/IOWA_JOlka_-_YAbloko_73061728.jpeg",
    type: "track"
  },
  {
    id: 84,
    title: "Applause",
    artist: "Lady Gaga",
    src: "/audio/Lady Gaga - Applause.mp3",
    fullSrc: "/audio/Lady Gaga - Applause.mp3",
    cover: "/covers/Lady Gaga - Applause.png",
    type: "track"
  },
  {
    id: 97,
    title: "Непохожие",
    artist: "Quest Pistols Show, Палагин Влад, Захарин Максим, Дудулад Даниил, Клименко Иван, Семенченко Вячеслав",
    src: "/audio/непохожи.mp3",
    fullSrc: "/audio/непохожи.mp3",
    cover: "/covers/непохожи.png",
    type: "track"
  },
  {
    id: 98,
    title: "Чайковский «Щелкунчик»",
    artist: "unknown",
    src: "/audio/Чайковский «Щелкунчик».m4a",
    fullSrc: "/audio/Чайковский «Щелкунчик».m4a",
    cover: "/covers/no-cover.jpg",
    type: "track"
  },
  {
    id: 99,
    title: "Billie Jean",
    artist: "Michael Jackson",
    src: "/audio/Michael Jackson - Billie Jean.mp3",
    fullSrc: "/audio/Michael Jackson - Billie Jean.mp3",
    cover: "/covers/Michael Jackson - Billie Jean.png",
    type: "track"
  },
  {
    id: 100,
    title: "Smooth Criminal (2012 Remaster)",
    artist: "Michael Jackson",
    src: "/audio/Michael Jackson - Smooth Criminal 2012 Remaster.mp3",
    fullSrc: "/audio/Michael Jackson - Smooth Criminal 2012 Remaster.mp3",
    cover: "/covers/Michael Jackson - Smooth Criminal 2012 Remaster.png",
    type: "track"
  },
  {
    id: 101,
    title: "Thriller",
    artist: "Michael Jackson",
    src: "/audio/Michael Jackson - Thriller.mp3",
    fullSrc: "/audio/Michael Jackson - Thriller.mp3",
    cover: "/covers/Michael Jackson - Thriller.png",
    type: "track"
  },
  {
    id: 102,
    title: "Feeling Good",
    artist: "Michael Bublé",
    src: "/audio/Michael Bubl - Feeling Good.mp3",
    fullSrc: "/audio/Michael Bubl - Feeling Good.mp3",
    cover: "/covers/Michael Bubl - Feeling Good.png",
    type: "track"
  },
  {
    id: 103,
    title: "Coming Undone",
    artist: "Korn",
    src: "/audio/Korn - Coming Undone.mp3",
    fullSrc: "/audio/Korn - Coming Undone.mp3",
    cover: "/covers/Korn - Coming Undone.png",
    type: "track"
  },
  {
    id: 104,
    title: "Freak On a Leash",
    artist: "Korn",
    src: "/audio/Korn - Freak On a Leash.mp3",
    fullSrc: "/audio/Korn - Freak On a Leash.mp3",
    cover: "/covers/Korn - Freak On a Leash.png",
    type: "track"
  },
  {
    id: 105,
    title: "Twisted Transistor",
    artist: "Korn",
    src: "/audio/Korn - Twisted Transistor.mp3",
    fullSrc: "/audio/Korn - Twisted Transistor.mp3",
    cover: "/covers/Korn - Twisted Transistor.png",
    type: "track"
  },
  {
    id: 106,
    title: "All In the Family",
    artist: "Korn, Fred Durst",
    src: "/audio/Korn, Fred Durst - All In the Family.mp3",
    fullSrc: "/audio/Korn, Fred Durst - All In the Family.mp3",
    cover: "/covers/Korn, Fred Durst - All In the Family.png",
    type: "track"
  },
  {
    id: 107,
    title: "Behind Blue Eyes",
    artist: "Limp Bizkit",
    src: "/audio/Limp Bizkit - Behind Blue Eyes.mp3",
    fullSrc: "/audio/Limp Bizkit - Behind Blue Eyes.mp3",
    cover: "/covers/Limp Bizkit - Behind Blue Eyes.png",
    type: "track"
  },
  {
    id: 108,
    title: "Break Stuff",
    artist: "Limp Bizkit",
    src: "/audio/Limp Bizkit - Break Stuff.mp3",
    fullSrc: "/audio/Limp Bizkit - Break Stuff.mp3",
    cover: "/covers/Limp Bizkit - Break Stuff.png",
    type: "track"
  },
  {
    id: 109,
    title: "Livin' It Up",
    artist: "Limp Bizkit",
    src: "/audio/Limp Bizkit - Livin It Up.mp3",
    fullSrc: "/audio/Limp Bizkit - Livin It Up.mp3",
    cover: "/covers/no-cover.jpg",
    type: "track"
  },
  {
    id: 110,
    title: "Nookie",
    artist: "Limp Bizkit",
    src: "/audio/Limp Bizkit - Nookie.mp3",
    fullSrc: "/audio/Limp Bizkit - Nookie.mp3",
    cover: "/covers/Limp Bizkit - Nookie.png",
    type: "track"
  },
  {
    id: 111,
    title: "Take A Look Around",
    artist: "Limp Bizkit",
    src: "/audio/Limp Bizkit - Take A Look Around.m4a",
    fullSrc: "/audio/Limp Bizkit - Take A Look Around.m4a",
    cover: "/covers/no-cover.jpg",
    type: "track"
  },
  {
    id: 112,
    title: "Arabella",
    artist: "Arctic Monkeys",
    src: "/audio/Arctic Monkeys - Arabella.mp3",
    fullSrc: "/audio/Arctic Monkeys - Arabella.mp3",
    cover: "/covers/Arctic Monkeys - Arabella.png",
    type: "track"
  },
  {
    id: 113,
    title: "Do I Wanna Know?",
    artist: "Arctic Monkeys",
    src: "/audio/Arctic Monkeys - Do I Wanna Know.mp3",
    fullSrc: "/audio/Arctic Monkeys - Do I Wanna Know.mp3",
    cover: "/covers/Arctic Monkeys - Do I Wanna Know.png",
    type: "track"
  },
  {
    id: 114,
    title: "I Wanna Be Yours",
    artist: "Arctic Monkeys",
    src: "/audio/Arctic Monkeys - I Wanna Be Yours.mp3",
    fullSrc: "/audio/Arctic Monkeys - I Wanna Be Yours.mp3",
    cover: "/covers/Arctic Monkeys - I Wanna Be Yours.png",
    type: "track"
  },
  {
    id: 115,
    title: "No. 1 Party Anthem",
    artist: "Arctic Monkeys",
    src: "/audio/Arctic Monkeys - No 1 Party Anthem.mp3",
    fullSrc: "/audio/Arctic Monkeys - No 1 Party Anthem.mp3",
    cover: "/covers/Arctic Monkeys - No 1 Party Anthem.png",
    type: "track"
  },
  {
    id: 116,
    title: "Riot Van",
    artist: "Arctic Monkeys",
    src: "/audio/Arctic Monkeys - Riot Van.mp3",
    fullSrc: "/audio/Arctic Monkeys - Riot Van.mp3",
    cover: "/covers/Arctic Monkeys - Riot Van.png",
    type: "track"
  },
  {
    id: 117,
    title: "Snap Out Of It",
    artist: "Arctic Monkeys",
    src: "/audio/Arctic Monkeys - Snap Out Of It.mp3",
    fullSrc: "/audio/Arctic Monkeys - Snap Out Of It.mp3",
    cover: "/covers/Arctic Monkeys - Snap Out Of It.png",
    type: "track"
  },
  {
    id: 118,
    title: "I Wanna Be Yours",
    artist: "Arctic Monkeys",
    src: "/audio/Arctic_Monkeys_-_I_Wanna_Be_Yours_47842917.mp3",
    fullSrc: "/audio/Arctic_Monkeys_-_I_Wanna_Be_Yours_47842917.mp3",
    cover: "/covers/Arctic_Monkeys_-_I_Wanna_Be_Yours_47842917.jpeg",
    type: "track"
  },
  {
    id: 119,
    title: "Stayin Alive",
    artist: "Bee Gees",
    src: "/audio/Bee Gees - Stayin Alive.mp3",
    fullSrc: "/audio/Bee Gees - Stayin Alive.mp3",
    cover: "/covers/Bee Gees - Stayin Alive.png",
    type: "track"
  },
  {
    id: 120,
    title: "Baby Baby",
    artist: "Corona",
    src: "/audio/Corona - Baby Baby.mp3",
    fullSrc: "/audio/Corona - Baby Baby.mp3",
    cover: "/covers/Corona - Baby Baby.png",
    type: "track"
  },
  {
    id: 121,
    title: "Think About the Way",
    artist: "Ice MC",
    src: "/audio/Ice MC - Think About the Way.mp3",
    fullSrc: "/audio/Ice MC - Think About the Way.mp3",
    cover: "/covers/Ice MC - Think About the Way.png",
    type: "track"
  },
  {
    id: 122,
    title: "Amazing",
    artist: "INNA",
    src: "/audio/INNA - Amazing.mp3",
    fullSrc: "/audio/INNA - Amazing.mp3",
    cover: "/covers/INNA - Amazing.png",
    type: "track"
  },
  {
    id: 123,
    title: "Deja Vu",
    artist: "INNA",
    src: "/audio/INNA - Deja Vu.mp3",
    fullSrc: "/audio/INNA - Deja Vu.mp3",
    cover: "/covers/INNA - Deja Vu.png",
    type: "track"
  },
  {
    id: 124,
    title: "On The Floor (Radio Edit)",
    artist: "Jennifer Lopez, Pitbull",
    src: "/audio/Jennifer Lopez, Pitbull - On The Floor Radio Edit.mp3",
    fullSrc: "/audio/Jennifer Lopez, Pitbull - On The Floor Radio Edit.mp3",
    cover: "/covers/Jennifer Lopez, Pitbull - On The Floor Radio Edit.png",
    type: "track"
  },
  {
    id: 125,
    title: "Get A Way",
    artist: "Maxx",
    src: "/audio/Maxx - Get A Way.mp3",
    fullSrc: "/audio/Maxx - Get A Way.mp3",
    cover: "/covers/Maxx - Get A Way.png",
    type: "track"
  },
  {
    id: 126,
    title: "I Never Felt so Right (Radio Mix)",
    artist: "Ben Delay",
    src: "/audio/Ben Delay - I Never Felt so Right Radio Mix.mp3",
    fullSrc: "/audio/Ben Delay - I Never Felt so Right Radio Mix.mp3",
    cover: "/covers/Ben Delay - I Never Felt so Right Radio Mix.png",
    type: "track"
  },
  {
    id: 127,
    title: "Hit My Heart (Sfaction Radio Edit)",
    artist: "Benassi Bros. & Dhany",
    src: "/audio/Benassi Bros  Dhany - Hit My Heart Sfaction Radio.mp3",
    fullSrc: "/audio/Benassi Bros  Dhany - Hit My Heart Sfaction Radio.mp3",
    cover: "/covers/no-cover.jpg",
    type: "track"
  },
  {
    id: 128,
    title: "Right Round",
    artist: "Flo Rida",
    src: "/audio/Flo Rida - Right Round.mp3",
    fullSrc: "/audio/Flo Rida - Right Round.mp3",
    cover: "/covers/Flo Rida - Right Round.png",
    type: "track"
  },
  {
    id: 129,
    title: "LoveGame",
    artist: "Lady Gaga",
    src: "/audio/Lady Gaga - LoveGame.mp3",
    fullSrc: "/audio/Lady Gaga - LoveGame.mp3",
    cover: "/covers/Lady Gaga - LoveGame.png",
    type: "track"
  },
  {
    id: 130,
    title: "Paparazzi",
    artist: "Lady Gaga",
    src: "/audio/Lady Gaga - Paparazzi.mp3",
    fullSrc: "/audio/Lady Gaga - Paparazzi.mp3",
    cover: "/covers/Lady Gaga - Paparazzi.png",
    type: "track"
  },
  {
    id: 131,
    title: "Castle In The Snow",
    artist: "The Avener, Kadebostany",
    src: "/audio/The Avener, Kadebostany - Castle In The Snow.mp3",
    fullSrc: "/audio/The Avener, Kadebostany - Castle In The Snow.mp3",
    cover: "/covers/The Avener, Kadebostany - Castle In The Snow.png",
    type: "track"
  },
  {
    id: 132,
    title: "Ghost Town",
    artist: "Adam Lambert",
    src: "/audio/Adam Lambert - Ghost Town.mp3",
    fullSrc: "/audio/Adam Lambert - Ghost Town.mp3",
    cover: "/covers/Adam Lambert - Ghost Town.png",
    type: "track"
  },
  {
    id: 133,
    title: "Sexy And I Know It",
    artist: "LMFAO",
    src: "/audio/LMFAO - Sexy And I Know It.mp3",
    fullSrc: "/audio/LMFAO - Sexy And I Know It.mp3",
    cover: "/covers/LMFAO - Sexy And I Know It.png",
    type: "track"
  },
  {
    id: 134,
    title: "Party Rock Anthem",
    artist: "LMFAO, Lauren Bennett, GoonRock",
    src: "/audio/LMFAO, Lauren Bennett, GoonRock - Party Rock Anthem.mp3",
    fullSrc: "/audio/LMFAO, Lauren Bennett, GoonRock - Party Rock Anthem.mp3",
    cover: "/covers/LMFAO, Lauren Bennett, GoonRock - Party Rock Anthem.png",
    type: "track"
  },
  {
    id: 135,
    title: "Moves Like Jagger",
    artist: "Maroon 5",
    src: "/audio/Maroon 5 - Moves Like Jagger.mp3",
    fullSrc: "/audio/Maroon 5 - Moves Like Jagger.mp3",
    cover: "/covers/Maroon 5 - Moves Like Jagger.png",
    type: "track"
  },
  {
    id: 136,
    title: "Sugar",
    artist: "Maroon 5",
    src: "/audio/Maroon 5 - Sugar.mp3",
    fullSrc: "/audio/Maroon 5 - Sugar.mp3",
    cover: "/covers/Maroon 5 - Sugar.png",
    type: "track"
  },
  {
    id: 137,
    title: "the boy is mine",
    artist: "Ariana Grande",
    src: "/audio/Ariana Grande - the boy is mine.mp3",
    fullSrc: "/audio/Ariana Grande - the boy is mine.mp3",
    cover: "/covers/no-cover.jpg",
    type: "track"
  },
  {
    id: 138,
    title: "Give It Away",
    artist: "Red Hot Chili Peppers",
    src: "/audio/Red Hot Chili Peppers - Give It Away.mp3",
    fullSrc: "/audio/Red Hot Chili Peppers - Give It Away.mp3",
    cover: "/covers/Red Hot Chili Peppers - Give It Away.png",
    type: "track"
  },
  {
    id: 139,
    title: "Ту-лу-ла",
    artist: "Чичерина",
    src: "/audio/CHicherina_-_Tu-lu-la_48073087.mp3",
    fullSrc: "/audio/CHicherina_-_Tu-lu-la_48073087.mp3",
    cover: "/covers/CHicherina_-_Tu-lu-la_48073087.jpeg",
    type: "track"
  },
  {
    id: 140,
    title: "Missing (Todd Terry Remix)",
    artist: "Everything But The Girl",
    src: "/audio/Everything But The Girl - Missing Todd Terry Remix.mp3",
    fullSrc: "/audio/Everything But The Girl - Missing Todd Terry Remix.mp3",
    cover: "/covers/Everything But The Girl - Missing Todd Terry Remix.png",
    type: "track"
  },
  {
    id: 141,
    title: "Take Me To Church",
    artist: "Hozier",
    src: "/audio/Hozier - Take Me To Church.mp3",
    fullSrc: "/audio/Hozier - Take Me To Church.mp3",
    cover: "/covers/Hozier - Take Me To Church.png",
    type: "track"
  },
  {
    id: 142,
    title: "Fresh",
    artist: "Kool & The Gang",
    src: "/audio/Kool  The Gang - Fresh.mp3",
    fullSrc: "/audio/Kool  The Gang - Fresh.mp3",
    cover: "/covers/Kool  The Gang - Fresh.png",
    type: "track"
  },
  {
    id: 143,
    title: "The Weekend (Original 12 Inch Mix)",
    artist: "Michael Gray",
    src: "/audio/Michael Gray - The Weekend Original 12 Inch Mix.mp3",
    fullSrc: "/audio/Michael Gray - The Weekend Original 12 Inch Mix.mp3",
    cover: "/covers/Michael Gray - The Weekend Original 12 Inch Mix.png",
    type: "track"
  },
  {
    id: 144,
    title: "Lady (Hear Me Tonight)",
    artist: "Modjo Band, Bernard Edwards Nile Rodgers Romain Tranchart Yann Destagnol, Romain Tranchart Yann Destagnol",
    src: "/audio/Modjo Band, Bernard Edwards Nile Rodgers Romain Tr.m4a",
    fullSrc: "/audio/Modjo Band, Bernard Edwards Nile Rodgers Romain Tr.m4a",
    cover: "/covers/no-cover.jpg",
    type: "track"
  },
  {
    id: 145,
    title: "Don't Speak",
    artist: "No Doubt",
    src: "/audio/No Doubt - Dont Speak.mp3",
    fullSrc: "/audio/No Doubt - Dont Speak.mp3",
    cover: "/covers/No Doubt - Dont Speak.png",
    type: "track"
  },
  {
    id: 146,
    title: "Never Gonna Give You Up",
    artist: "Rick Astley",
    src: "/audio/Rick Astley - Never Gonna Give You Up.mp3",
    fullSrc: "/audio/Rick Astley - Never Gonna Give You Up.mp3",
    cover: "/covers/Rick Astley - Never Gonna Give You Up.png",
    type: "track"
  },
  {
    id: 147,
    title: "Music Sounds Better With You (Radio Edit)",
    artist: "Stardust",
    src: "/audio/Stardust - Music Sounds Better With You Radio Edit.mp3",
    fullSrc: "/audio/Stardust - Music Sounds Better With You Radio Edit.mp3",
    cover: "/covers/Stardust - Music Sounds Better With You Radio Edit.png",
    type: "track"
  },
  {
    id: 148,
    title: "Lola's Theme (Radio Edit)",
    artist: "The Shapeshifters",
    src: "/audio/The Shapeshifters - Lolas Theme Radio Edit.m4a",
    fullSrc: "/audio/The Shapeshifters - Lolas Theme Radio Edit.m4a",
    cover: "/covers/no-cover.jpg",
    type: "track"
  },
  {
    id: 149,
    title: "Mankhetten",
    artist: "БФНД'ЭРОС",
    src: "/audio/BandEros - Mankhetten.mp3",
    fullSrc: "/audio/BandEros - Mankhetten.mp3",
    cover: "/covers/BandEros - Mankhetten.png",
    type: "track"
  },
  {
    id: 150,
    title: "two",
    artist: "bbno$",
    src: "/audio/bbno - two.m4a",
    fullSrc: "/audio/bbno - two.m4a",
    cover: "/covers/no-cover.jpg",
    type: "track"
  },
  {
    id: 151,
    title: "The Rhythm of the Night",
    artist: "Corona",
    src: "/audio/Corona - The Rhythm of the Night.mp3",
    fullSrc: "/audio/Corona - The Rhythm of the Night.mp3",
    cover: "/covers/Corona - The Rhythm of the Night.png",
    type: "track"
  },
  {
    id: 152,
    title: "Song #1",
    artist: "SEREBRO",
    src: "/audio/SEREBRO - Song 1.mp3",
    fullSrc: "/audio/SEREBRO - Song 1.mp3",
    cover: "/covers/SEREBRO - Song 1.png",
    type: "track"
  },
  {
    id: 153,
    title: "Can't Fight This Feeling",
    artist: "Sophie Ellis-Bextor, Junior Caldera",
    src: "/audio/Sophie EllisBextor, Junior Caldera - Cant Fight Th.mp3",
    fullSrc: "/audio/Sophie EllisBextor, Junior Caldera - Cant Fight Th.mp3",
    cover: "/covers/no-cover.jpg",
    type: "track"
  },
  {
    id: 154,
    title: "Pump Up The Jam",
    artist: "Technotronic",
    src: "/audio/Technotronic - Pump Up The Jam.mp3",
    fullSrc: "/audio/Technotronic - Pump Up The Jam.mp3",
    cover: "/covers/Technotronic - Pump Up The Jam.png",
    type: "track"
  },
  {
    id: 155,
    title: "Имя 505",
    artist: "Время и Стекло",
    src: "/audio/Время и Стекло - Имя 505.mp3",
    fullSrc: "/audio/Время и Стекло - Имя 505.mp3",
    cover: "/covers/no-cover.jpg",
    type: "track"
  },
  {
    id: 156,
    title: "На Cтиле",
    artist: "Время и Стекло",
    src: "/audio/Время и Стекло - На Cтиле.mp3",
    fullSrc: "/audio/Время и Стекло - На Cтиле.mp3",
    cover: "/covers/no-cover.jpg",
    type: "track"
  },
  {
    id: 157,
    title: "No Limit",
    artist: "2 Unlimited",
    src: "/audio/2 Unlimited - No Limit.mp3",
    fullSrc: "/audio/2 Unlimited - No Limit.mp3",
    cover: "/covers/2 Unlimited - No Limit.png",
    type: "track"
  },
  {
    id: 158,
    title: "Dancin (Krono Remix)",
    artist: "Aaron Smith, Krono, Luvli",
    src: "/audio/Aaron Smith, Krono, Luvli - Dancin Krono Remix.mp3",
    fullSrc: "/audio/Aaron Smith, Krono, Luvli - Dancin Krono Remix.mp3",
    cover: "/covers/Aaron Smith, Krono, Luvli - Dancin Krono Remix.png",
    type: "track"
  },
  {
    id: 159,
    title: "Just the Two of Us",
    artist: "Grover Washington, Jr., Bill Withers",
    src: "/audio/Grover Washington, Jr, Bill Withers - Just the Two.mp3",
    fullSrc: "/audio/Grover Washington, Jr, Bill Withers - Just the Two.mp3",
    cover: "/covers/Grover Washington, Jr, Bill Withers - Just the Two.png",
    type: "track"
  },
  {
    id: 160,
    title: "Фотография 9x12",
    artist: "IOWA",
    src: "/audio/IOWA - Фотография 9x12.mp3",
    fullSrc: "/audio/IOWA - Фотография 9x12.mp3",
    cover: "/covers/no-cover.jpg",
    type: "track"
  },
  {
    id: 161,
    title: "Be My Lover",
    artist: "La Bouche",
    src: "/audio/La Bouche - Be My Lover.mp3",
    fullSrc: "/audio/La Bouche - Be My Lover.mp3",
    cover: "/covers/La Bouche - Be My Lover.png",
    type: "track"
  },
  {
    id: 162,
    title: "Sleeping in My Car",
    artist: "Roxette",
    src: "/audio/Roxette - Sleeping in My Car.mp3",
    fullSrc: "/audio/Roxette - Sleeping in My Car.mp3",
    cover: "/covers/Roxette - Sleeping in My Car.png",
    type: "track"
  },
  {
    id: 163,
    title: "Red Crystal Castles",
    artist: "13Aurora, Crystal Castles, La Roux",
    src: "/audio/13Aurora, Crystal Castles, La Roux, Crystal Castle.mp3",
    fullSrc: "/audio/13Aurora, Crystal Castles, La Roux, Crystal Castle.mp3",
    cover: "/covers/no-cover.jpg",
    type: "track"
  },
  {
    id: 164,
    title: "Take on Me",
    artist: "a-ha",
    src: "/audio/aha - Take on Me.mp3",
    fullSrc: "/audio/aha - Take on Me.mp3",
    cover: "/covers/aha - Take on Me.png",
    type: "track"
  },
  {
    id: 165,
    title: "Everybody (Backstreet's Back) (Extended Version)",
    artist: "Backstreet Boys",
    src: "/audio/Backstreet_Boys_Everybody_Backstreets_Back_Extended_Version.mp3",
    fullSrc: "/audio/Backstreet_Boys_Everybody_Backstreets_Back_Extended_Version.mp3",
    cover: "/covers/Backstreet_Boys_Everybody_Backstreets_Back_Extended_Version.png",
    type: "track"
  },
  {
    id: 166,
    title: "Daddy Cool",
    artist: "Boney M.",
    src: "/audio/Boney M - Daddy Cool.mp3",
    fullSrc: "/audio/Boney M - Daddy Cool.mp3",
    cover: "/covers/Boney M - Daddy Cool.png",
    type: "track"
  },
  {
    id: 167,
    title: "Gotta Go Home",
    artist: "Boney M.",
    src: "/audio/Boney M - Gotta Go Home.mp3",
    fullSrc: "/audio/Boney M - Gotta Go Home.mp3",
    cover: "/covers/Boney M - Gotta Go Home.png",
    type: "track"
  },
  {
    id: 168,
    title: "Hot Stuff",
    artist: "Donna Summer",
    src: "/audio/Donna Summer - Hot Stuff.mp3",
    fullSrc: "/audio/Donna Summer - Hot Stuff.mp3",
    cover: "/covers/Donna Summer - Hot Stuff.png",
    type: "track"
  },
  {
    id: 169,
    title: "It's My Life (Radio Edit)",
    artist: "Dr. Alban",
    src: "/audio/Dr Alban - Its My Life Radio Edit.mp3",
    fullSrc: "/audio/Dr Alban - Its My Life Radio Edit.mp3",
    cover: "/covers/Dr Alban - Its My Life Radio Edit.png",
    type: "track"
  },
  {
    id: 170,
    title: "Boogie Wonderland",
    artist: "Earth， Wind & Fire, The Emotions",
    src: "/audio/Earth Wind  Fire, The Emotions - Boogie Wonderland.mp3",
    fullSrc: "/audio/Earth Wind  Fire, The Emotions - Boogie Wonderland.mp3",
    cover: "/covers/Earth Wind  Fire, The Emotions - Boogie Wonderland.png",
    type: "track"
  },
  {
    id: 171,
    title: "Lordly (feat. Alex Aiono)",
    artist: "Feder, Alex Aiono",
    src: "/audio/Feder, Alex Aiono - Lordly feat Alex Aiono.mp3",
    fullSrc: "/audio/Feder, Alex Aiono - Lordly feat Alex Aiono.mp3",
    cover: "/covers/no-cover.jpg",
    type: "track"
  },
  {
    id: 172,
    title: "The Power Of Love",
    artist: "Huey Lewis & The News",
    src: "/audio/Huey Lewis  The News - The Power Of Love.mp3",
    fullSrc: "/audio/Huey Lewis  The News - The Power Of Love.mp3",
    cover: "/covers/no-cover.jpg",
    type: "track"
  },
  {
    id: 173,
    title: "Hot",
    artist: "INNA",
    src: "/audio/INNA - Hot.mp3",
    fullSrc: "/audio/INNA - Hot.mp3",
    cover: "/covers/INNA - Hot.png",
    type: "track"
  },
  {
    id: 174,
    title: "Abracadabra",
    artist: "Lady Gaga",
    src: "/audio/Lady Gaga - Abracadabra.m4a",
    fullSrc: "/audio/Lady Gaga - Abracadabra.m4a",
    cover: "/covers/no-cover.jpg",
    type: "track"
  },
  {
    id: 175,
    title: "Tied Up",
    artist: "Little Ceremonies",
    src: "/audio/Little Ceremonies - Tied Up.mp3",
    fullSrc: "/audio/Little Ceremonies - Tied Up.mp3",
    cover: "/covers/no-cover.jpg",
    type: "track"
  },
  {
    id: 176,
    title: "Insomnia",
    artist: "Richie Kotzen",
    src: "/audio/Richie Kotzen - Insomnia.mp3",
    fullSrc: "/audio/Richie Kotzen - Insomnia.mp3",
    cover: "/covers/no-cover.jpg",
    type: "track"
  },
  {
    id: 177,
    title: "S & M",
    artist: "Rihanna",
    src: "/audio/Rihanna - S  M.mp3",
    fullSrc: "/audio/Rihanna - S  M.mp3",
    cover: "/covers/Rihanna - S  M.png",
    type: "track"
  },
  {
    id: 178,
    title: "Listen To Your Heart",
    artist: "Roxette",
    src: "/audio/Roxette - Listen To Your Heart.mp3",
    fullSrc: "/audio/Roxette - Listen To Your Heart.mp3",
    cover: "/covers/no-cover.jpg",
    type: "track"
  },
  {
    id: 179,
    title: "Shape Of My Heart",
    artist: "Sting",
    src: "/audio/Sting - Shape Of My Heart.mp3",
    fullSrc: "/audio/Sting - Shape Of My Heart.mp3",
    cover: "/covers/Sting - Shape Of My Heart.png",
    type: "track"
  },
  {
    id: 180,
    title: "Every Breath You Take",
    artist: "The Police",
    src: "/audio/The Police - Every Breath You Take.mp3",
    fullSrc: "/audio/The Police - Every Breath You Take.mp3",
    cover: "/covers/The Police - Every Breath You Take.png",
    type: "track"
  },
  {
    id: 181,
    title: "Message In A Bottle",
    artist: "The Police",
    src: "/audio/The Police - Message In A Bottle.mp3",
    fullSrc: "/audio/The Police - Message In A Bottle.mp3",
    cover: "/covers/The Police - Message In A Bottle.png",
    type: "track"
  },
  {
    id: 182,
    title: "Heathens",
    artist: "twenty one pilots",
    src: "/audio/twenty one pilots - Heathens.mp3",
    fullSrc: "/audio/twenty one pilots - Heathens.mp3",
    cover: "/covers/twenty one pilots - Heathens.png",
    type: "track"
  },
  {
    id: 183,
    title: "Ride",
    artist: "twenty one pilots",
    src: "/audio/twenty one pilots - Ride.mp3",
    fullSrc: "/audio/twenty one pilots - Ride.mp3",
    cover: "/covers/twenty one pilots - Ride.png",
    type: "track"
  },
  {
    id: 184,
    title: "Stressed Out",
    artist: "twenty one pilots",
    src: "/audio/twenty one pilots - Stressed Out.mp3",
    fullSrc: "/audio/twenty one pilots - Stressed Out.mp3",
    cover: "/covers/twenty one pilots - Stressed Out.png",
    type: "track"
  },
  {
    id: 185,
    title: "Heads Will Roll",
    artist: "Yeah Yeah Yeahs",
    src: "/audio/Yeah Yeah Yeahs - Heads Will Roll.mp3",
    fullSrc: "/audio/Yeah Yeah Yeahs - Heads Will Roll.mp3",
    cover: "/covers/Yeah Yeah Yeahs - Heads Will Roll.jpeg",
    type: "track"
  },
  {
    id: 186,
    title: "Around the World (La La La La La) (Radio Version)",
    artist: "A Touch Of Class",
    src: "/audio/A Touch Of Class - Around the World La La La La La.mp3",
    fullSrc: "/audio/A Touch Of Class - Around the World La La La La La.mp3",
    cover: "/covers/A Touch Of Class - Around the World La La La La La.png",
    type: "track"
  },
  {
    id: 187,
    title: "R U Mine?",
    artist: "Arctic Monkeys",
    src: "/audio/Arctic Monkeys - R U Mine.mp3",
    fullSrc: "/audio/Arctic Monkeys - R U Mine.mp3",
    cover: "/covers/Arctic Monkeys - R U Mine.png",
    type: "track"
  },
  {
    id: 188,
    title: "Why'd You Only Call Me When You're High?",
    artist: "Arctic Monkeys",
    src: "/audio/Arctic Monkeys - Whyd You Only Call Me When Youre High.mp3",
    fullSrc: "/audio/Arctic Monkeys - Whyd You Only Call Me When Youre High.mp3",
    cover: "/covers/Arctic Monkeys - Whyd You Only Call Me When Youre High.png",
    type: "track"
  },
  {
    id: 189,
    title: "Gonna Make You Sweat (Everybody Dance Now) (Radio Mix)",
    artist: "C+C Music Factory, Freedom Williams",
    src: "/audio/CC_Music_Factory,_Freedom_Williams_Gonna_Make_You_Sweat_Everybody.mp3",
    fullSrc: "/audio/CC_Music_Factory,_Freedom_Williams_Gonna_Make_You_Sweat_Everybody.mp3",
    cover: "/covers/CC_Music_Factory,_Freedom_Williams_Gonna_Make_You_Sweat_Everybody.png",
    type: "track"
  },
  {
    id: 190,
    title: "[I Just] Died In Your Arms",
    artist: "Cutting Crew",
    src: "/audio/Cutting Crew - I Just Died In Your Arms.mp3",
    fullSrc: "/audio/Cutting Crew - I Just Died In Your Arms.mp3",
    cover: "/covers/Cutting Crew - I Just Died In Your Arms.png",
    type: "track"
  },
  {
    id: 191,
    title: "Careless Whisper",
    artist: "George Michael",
    src: "/audio/George Michael - Careless Whisper.mp3",
    fullSrc: "/audio/George Michael - Careless Whisper.mp3",
    cover: "/covers/George Michael - Careless Whisper.png",
    type: "track"
  },
  {
    id: 192,
    title: "Love Me Again",
    artist: "John Newman",
    src: "/audio/John Newman - Love Me Again.mp3",
    fullSrc: "/audio/John Newman - Love Me Again.mp3",
    cover: "/covers/John Newman - Love Me Again.png",
    type: "track"
  },
  {
    id: 193,
    title: "In The End",
    artist: "Linkin Park",
    src: "/audio/Linkin_Park_-_In_The_End_47828874.mp3",
    fullSrc: "/audio/Linkin_Park_-_In_The_End_47828874.mp3",
    cover: "/covers/Linkin Park - In The End 47828874.jpeg",
    type: "track"
  },
  {
    id: 194,
    title: "Harder To Breathe",
    artist: "Maroon 5",
    src: "/audio/Maroon 5 - Harder To Breathe.mp3",
    fullSrc: "/audio/Maroon 5 - Harder To Breathe.mp3",
    cover: "/covers/Maroon 5 - Harder To Breathe.png",
    type: "track"
  },
  {
    id: 195,
    title: "All The Right Moves",
    artist: "OneRepublic",
    src: "/audio/OneRepublic - All The Right Moves.mp3",
    fullSrc: "/audio/OneRepublic - All The Right Moves.mp3",
    cover: "/covers/OneRepublic - All The Right Moves.png",
    type: "track"
  },
  {
    id: 196,
    title: "Counting Stars",
    artist: "OneRepublic",
    src: "/audio/OneRepublic - Counting Stars.mp3",
    fullSrc: "/audio/OneRepublic - Counting Stars.mp3",
    cover: "/covers/OneRepublic - Counting Stars.png",
    type: "track"
  },
  {
    id: 197,
    title: "Good Life",
    artist: "OneRepublic",
    src: "/audio/OneRepublic - Good Life.mp3",
    fullSrc: "/audio/OneRepublic - Good Life.mp3",
    cover: "/covers/OneRepublic - Good Life.png",
    type: "track"
  },
  {
    id: 198,
    title: "Love Runs Out",
    artist: "OneRepublic",
    src: "/audio/OneRepublic - Love Runs Out.mp3",
    fullSrc: "/audio/OneRepublic - Love Runs Out.mp3",
    cover: "/covers/OneRepublic - Love Runs Out.png",
    type: "track"
  },
  {
    id: 199,
    title: "Stop And Stare",
    artist: "OneRepublic",
    src: "/audio/OneRepublic - Stop And Stare.mp3",
    fullSrc: "/audio/OneRepublic - Stop And Stare.mp3",
    cover: "/covers/OneRepublic - Stop And Stare.png",
    type: "track"
  },
  {
    id: 200,
    title: "Улыбайся",
    artist: "IOWA",
    src: "/audio/IOWA - Улыбайся.mp3",
    fullSrc: "/audio/IOWA - Улыбайся.mp3",
    cover: "/covers/IOWA - Улыбайся.jpg",
    type: "track"
  },
  {
    id: 201,
    title: "Романс",
    artist: "PIZZA, Приказчиков С.",
    src: "/audio/PIZZA,_Приказчиков_С,_Приказчиков_С_Романс.mp3",
    fullSrc: "/audio/PIZZA,_Приказчиков_С,_Приказчиков_С_Романс.mp3",
    cover: "/covers/PIZZA,_Приказчиков_С,_Приказчиков_С_Романс.jpg",
    type: "track"
  },
  {
    id: 202,
    title: "Dani California",
    artist: "Red Hot Chili Peppers",
    src: "/audio/Red Hot Chili Peppers - Dani California.mp3",
    fullSrc: "/audio/Red Hot Chili Peppers - Dani California.mp3",
    cover: "/covers/Red Hot Chili Peppers - Dani California.jpg",
    type: "track"
  },
  {
    id: 203,
    title: "Livin' la Vida Loca",
    artist: "Ricky Martin",
    src: "/audio/Ricky Martin - Livin la Vida Loca.mp3",
    fullSrc: "/audio/Ricky Martin - Livin la Vida Loca.mp3",
    cover: "/covers/Ricky Martin - Livin la Vida Loca.jpg",
    type: "track"
  },
  {
    id: 204,
    title: "Мало тебя",
    artist: "SEREBRO",
    src: "/audio/SEREBRO - Мало тебя.mp3",
    fullSrc: "/audio/SEREBRO - Мало тебя.mp3",
    cover: "/covers/SEREBRO - Мало тебя.jpg",
    type: "track"
  },
  {
    id: 205,
    title: "Мама Люба",
    artist: "SEREBRO",
    src: "/audio/SEREBRO - Мама Люба.mp3",
    fullSrc: "/audio/SEREBRO - Мама Люба.mp3",
    cover: "/covers/SEREBRO - Мама Люба.jpg",
    type: "track"
  },
  {
    id: 206,
    title: "Ты не верь слезам",
    artist: "Шура",
    src: "/audio/SHura_-_Ty_ne_ver_slezam_58001132.mp3",
    fullSrc: "/audio/SHura_-_Ty_ne_ver_slezam_58001132.mp3",
    cover: "/covers/SHura_-_Ty_ne_ver_slezam_58001132.jpg",
    type: "track"
  },
  {
    id: 207,
    title: "Apologize",
    artist: "Timbaland, OneRepublic",
    src: "/audio/Timbaland, OneRepublic - Apologize.mp3",
    fullSrc: "/audio/Timbaland, OneRepublic - Apologize.mp3",
    cover: "/covers/Timbaland, OneRepublic - Apologize.jpg",
    type: "track"
  },
  {
    id: 208,
    title: "Пожары",
    artist: "XOLIDAYBOY",
    src: "/audio/XOLIDAYBOY - Пожары.mp3",
    fullSrc: "/audio/XOLIDAYBOY - Пожары.mp3",
    cover: "/covers/no-cover.jpg",
    type: "track"
  },
  {
    id: 209,
    title: "#Сумасшедшая",
    artist: "Алексей Воробьев",
    src: "/audio/Алексей Воробьев - Сумасшедшая.mp3",
    fullSrc: "/audio/Алексей Воробьев - Сумасшедшая.mp3",
    cover: "/covers/Алексей Воробьев - Сумасшедшая.jpg",
    type: "track"
  },
  {
    id: 210,
    title: "Ночь",
    artist: "Андрей Губин",
    src: "/audio/Андрей Губин - Ночь.mp3",
    fullSrc: "/audio/Андрей Губин - Ночь.mp3",
    cover: "/covers/Андрей Губин - Ночь.jpg",
    type: "track"
  },
  {
    id: 211,
    title: "Кустурица",
    artist: "Братья Гримм",
    src: "/audio/Братья Гримм - Кустурица.mp3",
    fullSrc: "/audio/Братья Гримм - Кустурица.mp3",
    cover: "/covers/Братья Гримм - Кустурица.jpg",
    type: "track"
  },
  {
    id: 212,
    title: "Оплачено",
    artist: "Дайте танк (!)",
    src: "/audio/Дайте_танк_,_Дмитрий_Мозжухин,_Дмитрий_Мозжухин_ (1).mp3",
    fullSrc: "/audio/Дайте_танк_,_Дмитрий_Мозжухин,_Дмитрий_Мозжухин_ (1).mp3",
    cover: "/covers/Дайте_танк_,_Дмитрий_Мозжухин,_Дмитрий_Мозжухин_ (1).jpg",
    type: "track"
  },
  {
    id: 213,
    title: "Люди",
    artist: "Дайте танк (!)",
    src: "/audio/Дайте_танк_,_Дмитрий_Мозжухин,_Дмитрий_Мозжухин_.mp3",
    fullSrc: "/audio/Дайте_танк_,_Дмитрий_Мозжухин,_Дмитрий_Мозжухин_.mp3",
    cover: "/covers/Дайте_танк_,_Дмитрий_Мозжухин,_Дмитрий_Мозжухин_.jpg",
    type: "track"
  },
  {
    id: 214,
    title: "Альтернатива",
    artist: "Дайте танк (!)",
    src: "/audio/Дайте_танк_,_Дмитрий_Мозжухин,_Дмитрий_Мозжухин_Альтернатива.mp3",
    fullSrc: "/audio/Дайте_танк_,_Дмитрий_Мозжухин,_Дмитрий_Мозжухин_Альтернатива.mp3",
    cover: "/covers/Дайте_танк_,_Дмитрий_Мозжухин,_Дмитрий_Мозжухин_Альтернатива.jpg",
    type: "track"
  },
  {
    id: 215,
    title: "Веселиться",
    artist: "Дайте танк (!)",
    src: "/audio/Дайте_танк_,_Дмитрий_Мозжухин,_Дмитрий_Мозжухин_Веселиться.mp3",
    fullSrc: "/audio/Дайте_танк_,_Дмитрий_Мозжухин,_Дмитрий_Мозжухин_Веселиться.mp3",
    cover: "/covers/Дайте_танк_,_Дмитрий_Мозжухин,_Дмитрий_Мозжухин_Веселиться.jpg",
    type: "track"
  },
  {
    id: 216,
    title: "Чудо",
    artist: "Дайте танк (!)",
    src: "/audio/Дайте_танк_,_Дмитрий_Мозжухин,_Дмитрий_Мозжухин_Чудо.mp3",
    fullSrc: "/audio/Дайте_танк_,_Дмитрий_Мозжухин,_Дмитрий_Мозжухин_Чудо.mp3",
    cover: "/covers/Дайте_танк_,_Дмитрий_Мозжухин,_Дмитрий_Мозжухин_Чудо.jpg",
    type: "track"
  },
  {
    id: 217,
    title: "Шанс",
    artist: "Дайте танк (!)",
    src: "/audio/Дайте_танк_,_Дмитрий_Мозжухин,_Дмитрий_Мозжухин_Шанс.mp3",
    fullSrc: "/audio/Дайте_танк_,_Дмитрий_Мозжухин,_Дмитрий_Мозжухин_Шанс.mp3",
    cover: "/covers/Дайте_танк_,_Дмитрий_Мозжухин,_Дмитрий_Мозжухин_Шанс.jpg",
    type: "track"
  },
  {
    id: 218,
    title: "Самая самая",
    artist: "Егор Крид, Е. В. Глеб, М. Решетняк, Е. Н. Булаткин",
    src: "/audio/Егор_Крид,_Е_В_Глеб,_М_Решетняк,_Е_Н_Булаткин_Са.mp3",
    fullSrc: "/audio/Егор_Крид,_Е_В_Глеб,_М_Решетняк,_Е_Н_Булаткин_Са.mp3",
    cover: "/covers/Егор_Крид,_Е_В_Глеб,_М_Решетняк,_Е_Н_Булаткин_Са.jpg",
    type: "track"
  },
  {
    id: 219,
    title: "Невеста",
    artist: "Егор Крид, М. Решетняк, Е. Булаткин",
    src: "/audio/Егор_Крид,_М_Решетняк,_Е_Булаткин,_М_Решетняк,_Е_Булаткин_Невеста.mp3",
    fullSrc: "/audio/Егор_Крид,_М_Решетняк,_Е_Булаткин,_М_Решетняк,_Е_Булаткин_Невеста.mp3",
    cover: "/covers/Егор_Крид,_М_Решетняк,_Е_Булаткин,_М_Решетняк,_Е_Булаткин_Невеста.jpg",
    type: "track"
  },
  {
    id: 220,
    title: "Самолеты",
    artist: "Женя Трофимов",
    src: "/audio/Женя_Трофимов,_Женя_Трофимов_Самолеты.mp3",
    fullSrc: "/audio/Женя_Трофимов,_Женя_Трофимов_Самолеты.mp3",
    cover: "/covers/Женя_Трофимов,_Женя_Трофимов_Самолеты.jpg",
    type: "track"
  },
  {
    id: 221,
    title: "Поезда",
    artist: "Женя Трофимов & Комната культуры",
    src: "/audio/Женя_Трофимов_Комната_культуры_Поезда.mp3",
    fullSrc: "/audio/Женя_Трофимов_Комната_культуры_Поезда.mp3",
    cover: "/covers/no-cover.jpg",
    type: "track"
  },
  {
    id: 222,
    title: "Танцуй",
    artist: "Звери",
    src: "/audio/Звери - Танцуй.mp3",
    fullSrc: "/audio/Звери - Танцуй.mp3",
    cover: "/covers/no-cover.jpg",
    type: "track"
  },
  {
    id: 223,
    title: "На большом воздушном шаре,",
    artist: "Ёлка",
    src: "/audio/лка - На большом воздушном шаре.mp3",
    fullSrc: "/audio/лка - На большом воздушном шаре.mp3",
    cover: "/covers/лка - На большом воздушном шаре.jpg",
    type: "track"
  },
  {
    id: 224,
    title: "На Титанике",
    artist: "Лолита",
    src: "/audio/Лолита - На Титанике.mp3",
    fullSrc: "/audio/Лолита - На Титанике.mp3",
    cover: "/covers/Лолита - На Титанике.jpg",
    type: "track"
  },
  {
    id: 225,
    title: "Невеста?",
    artist: "Мумий Тролль",
    src: "/audio/Мумий Тролль - Невеста.mp3",
    fullSrc: "/audio/Мумий Тролль - Невеста.mp3",
    cover: "/covers/Мумий Тролль - Невеста.jpg",
    type: "track"
  },
  {
    id: 226,
    title: "Лето, плавки, рок-н-ролл",
    artist: "Нервы, Евгений Мильковский",
    src: "/audio/Нервы,_Евгений_Мильковский_Лето,_плавки,_рокнрол.mp3",
    fullSrc: "/audio/Нервы,_Евгений_Мильковский_Лето,_плавки,_рокнрол.mp3",
    cover: "/covers/Нервы,_Евгений_Мильковский_Лето,_плавки,_рокнрол.jpg",
    type: "track"
  },
  {
    id: 227,
    title: "Чумачечая весна",
    artist: "Потап и Настя",
    src: "/audio/Потап и Настя - Чумачечая весна.mp3",
    fullSrc: "/audio/Потап и Настя - Чумачечая весна.mp3",
    cover: "/covers/no-cover.jpg",
    type: "track"
  },
  {
    id: 228,
    title: "18 Мне уже",
    artist: "Руки Вверх",
    src: "/audio/Руки Вверх - 18 Мне уже.mp3",
    fullSrc: "/audio/Руки Вверх - 18 Мне уже.mp3",
    cover: "/covers/Руки Вверх - 18 Мне уже.jpg",
    type: "track"
  },
  {
    id: 229,
    title: "Революция",
    artist: "Quest Pistols",
    src: "/audio/Quest Pistols - Революция.mp3",
    fullSrc: "/audio/Quest Pistols - Революция.mp3",
    cover: "/covers/Quest Pistols - Революция-1745684476171.png",
    type: "track"
  },
  {
    id: 230,
    title: "Ты так красива",
    artist: "Quest Pistols, I. Chetha, I. Chetha",
    src: "/audio/Quest_Pistols,_I_Chetha,_I_Chetha_Ты_так_красива.mp3",
    fullSrc: "/audio/Quest_Pistols,_I_Chetha,_I_Chetha_Ты_так_красива.mp3",
    cover: "/covers/Quest_Pistols,_I_Chetha,_I_Chetha_Ты_так_красива.jpg",
    type: "track"
  },
  {
    id: 231,
    title: "Круче всех (feat. Open Kids)",
    artist: "Quest Pistols Show, Open Kids, Беляев Андрей, Беляев Андрей",
    src: "/audio/Quest_Pistols_Show,_Open_Kids,_Беляев_Андрей,_Беля.mp3",
    fullSrc: "/audio/Quest_Pistols_Show,_Open_Kids,_Беляев_Андрей,_Беля.mp3",
    cover: "/covers/Quest_Pistols_Show,_Open_Kids,_Беляев_Андрей,_Беля.jpg",
    type: "track"
  },
  {
    id: 232,
    title: "Санта Лючия",
    artist: "Quest Pistols Show, Борис Степаненко, Павел Палий, Антон Вербищук, Михаил Крупин",
    src: "/audio/Quest_Pistols_Show,_Борис_Степаненко,_Павел_Палий,.mp3",
    fullSrc: "/audio/Quest_Pistols_Show,_Борис_Степаненко,_Павел_Палий,.mp3",
    cover: "/covers/Quest_Pistols_Show,_Борис_Степаненко,_Павел_Палий,.jpg",
    type: "track"
  },
  {
    id: 236,
    title: "Rollin' (Air Raid Vehicle)",
    artist: "Limp Bizkit",
    src: "/audio/Limp_Bizkit_-_Rollin_Air_Raid_Vehicle_47872518.mp3",
    fullSrc: "/audio/Limp_Bizkit_-_Rollin_Air_Raid_Vehicle_47872518.mp3",
    cover: "/covers/Limp Bizkit - Rollin Air Raid Vehicle 47872518.jpeg",
    type: "track"
  },
  {
    id: 247,
    title: "Crazy",
    artist: "Gnarls Barkley",
    src: "/audio/Gnarls_Barkley_-_Crazy_48029930.mp3",
    fullSrc: "/audio/Gnarls_Barkley_-_Crazy_48029930.mp3",
    cover: "/covers/Gnarls Barkley - Crazy 48029930.jpeg",
    type: "track"
  },
  {
    id: 248,
    title: "Clint Eastwood",
    artist: "Gorillaz",
    src: "/audio/Gorillaz_-_Clint_Eastwood_48146959.mp3",
    fullSrc: "/audio/Gorillaz_-_Clint_Eastwood_48146959.mp3",
    cover: "/covers/no-cover.jpg",
    type: "track"
  },
  {
    id: 249,
    title: "Feel Good Inc.",
    artist: "Gorillaz",
    src: "/audio/Gorillaz_-_Feel_Good_Inc_75950068.mp3",
    fullSrc: "/audio/Gorillaz_-_Feel_Good_Inc_75950068.mp3",
    cover: "/covers/Gorillaz - Feel Good Inc 75950068.jpeg",
    type: "track"
  },
  {
    id: 250,
    title: "DARE",
    artist: "Gorillaz, Jamie Hewlett, Damon Albarn",
    src: "/audio/Gorillaz_Jamie_Hewlett_Damon_Albarn_-_DARE_47843236.mp3",
    fullSrc: "/audio/Gorillaz_Jamie_Hewlett_Damon_Albarn_-_DARE_47843236.mp3",
    cover: "/covers/no-cover.jpg",
    type: "track"
  },
  {
    id: 251,
    title: "Dirty Harry",
    artist: "Gorillaz, Jamie Hewlett, Damon Albarn",
    src: "/audio/Gorillaz_Jamie_Hewlett_Damon_Albarn_-_Dirty_Harry_47843228.mp3",
    fullSrc: "/audio/Gorillaz_Jamie_Hewlett_Damon_Albarn_-_Dirty_Harry_47843228.mp3",
    cover: "/covers/Gorillaz Jamie Hewlett Damon Albarn - Dirty Harry 47843228.jpeg",
    type: "track"
  },
  {
    id: 252,
    title: "Rhinestone Eyes",
    artist: "Gorillaz, Jamie Hewlett, Damon Albarn",
    src: "/audio/Gorillaz_Jamie_Hewlett_Damon_Albarn_-_Rhinestone_Eyes_48212743.mp3",
    fullSrc: "/audio/Gorillaz_Jamie_Hewlett_Damon_Albarn_-_Rhinestone_Eyes_48212743.mp3",
    cover: "/covers/Gorillaz Jamie Hewlett Damon Albarn - Rhinestone Eyes 48212743.jpeg",
    type: "track"
  },
  {
    id: 253,
    title: "Twist",
    artist: "Korn",
    src: "/audio/Korn_-_Twist_47872787.mp3",
    fullSrc: "/audio/Korn_-_Twist_47872787.mp3",
    cover: "/covers/Korn - Twist 47872787.jpeg",
    type: "track"
  },
  {
    id: 254,
    title: "Die With A Smile",
    artist: "Lady Gaga",
    src: "/audio/Lady_Gaga_-_Die_With_A_Smile_79149305.mp3",
    fullSrc: "/audio/Lady_Gaga_-_Die_With_A_Smile_79149305.mp3",
    cover: "/covers/Lady Gaga - Die With A Smile 79149305.jpeg",
    type: "track"
  },
  {
    id: 255,
    title: "Bad",
    artist: "Michael Jackson",
    src: "/audio/Michael_Jackson_-_Bad_47829982.mp3",
    fullSrc: "/audio/Michael_Jackson_-_Bad_47829982.mp3",
    cover: "/covers/Michael Jackson - Bad 47829982.jpeg",
    type: "track"
  },
  {
    id: 256,
    title: "Beat It",
    artist: "Michael Jackson",
    src: "/audio/Michael_Jackson_-_Beat_It_47829974.mp3",
    fullSrc: "/audio/Michael_Jackson_-_Beat_It_47829974.mp3",
    cover: "/covers/no-cover.jpg",
    type: "track"
  },
  {
    id: 257,
    title: "Earth Song",
    artist: "Michael Jackson, Steve Porcaro, Maxi Anderson, Jesse Corti, Annette Sanders, Geoff Grace",
    src: "/audio/Michael_Jackson_Steve_Porcaro_Maxi_Anderson_Jesse_Corti_Annette_Sanders_Geoff_Grace_-_Earth_Song_48273714.mp3",
    fullSrc: "/audio/Michael_Jackson_Steve_Porcaro_Maxi_Anderson_Jesse_Corti_Annette_Sanders_Geoff_Grace_-_Earth_Song_48273714.mp3",
    cover: "/covers/Michael Jackson Steve Porcaro Maxi Anderson Jesse Corti Annette Sanders Geoff Grace - Earth Song 48273714.jpeg",
    type: "track"
  },
  {
    id: 258,
    title: "Stranger in Moscow",
    artist: "Michael Jackson, Steve Porcaro, Maxi Anderson, Jesse Corti, Annette Sanders, Geoff Grace",
    src: "/audio/Michael_Jackson_Steve_Porcaro_Maxi_Anderson_Jesse_Corti_Annette_Sanders_Geoff_Grace_-_Stranger_in_Moscow_48273711.mp3",
    fullSrc: "/audio/Michael_Jackson_Steve_Porcaro_Maxi_Anderson_Jesse_Corti_Annette_Sanders_Geoff_Grace_-_Stranger_in_Moscow_48273711.mp3",
    cover: "/covers/Michael Jackson Steve Porcaro Maxi Anderson Jesse Corti Annette Sanders Geoff Grace - Stranger in Moscow 48273711.jpeg",
    type: "track"
  },
  {
    id: 259,
    title: "APT.",
    artist: "ROSÉ",
    src: "/audio/Ros_-_APT_79149304.mp3",
    fullSrc: "/audio/Ros_-_APT_79149304.mp3",
    cover: "/covers/Ros - APT 79149304.jpeg",
    type: "track"
  },
  {
    id: 260,
    title: "Cradles",
    artist: "Sub Urban",
    src: "/audio/Sub_Urban_-_Cradles_61741925.mp3",
    fullSrc: "/audio/Sub_Urban_-_Cradles_61741925.mp3",
    cover: "/covers/Sub Urban - Cradles 61741925.jpeg",
    type: "track"
  },
  {
    id: 261,
    title: "PATCHWERK (with Two Feet)",
    artist: "Sub Urban, Two Feet",
    src: "/audio/Sub_Urban_Two_Feet_-_PATCHWERK_with_Two_Feet_72873958.mp3",
    fullSrc: "/audio/Sub_Urban_Two_Feet_-_PATCHWERK_with_Two_Feet_72873958.mp3",
    cover: "/covers/Sub Urban Two Feet - PATCHWERK with Two Feet 72873958.jpeg",
    type: "track"
  },
  {
    id: 262,
    title: "dimple",
    artist: "BTS",
    src: "/audio/BTS_-_dimple_48701166.mp3",
    fullSrc: "/audio/BTS_-_dimple_48701166.mp3",
    cover: "/covers/BTS - dimple 48701166.jpeg",
    type: "track"
  },
  {
    id: 263,
    title: "Run",
    artist: "BTS",
    src: "/audio/BTS_-_Run_56088079.mp3",
    fullSrc: "/audio/BTS_-_Run_56088079.mp3",
    cover: "/covers/BTS - Run 56088079.jpeg",
    type: "track"
  },
  {
    id: 264,
    title: "Silver Spoon",
    artist: "BTS",
    src: "/audio/BTS_-_Silver_Spoon_56088084.mp3",
    fullSrc: "/audio/BTS_-_Silver_Spoon_56088084.mp3",
    cover: "/covers/BTS - Silver Spoon 56088084.jpeg",
    type: "track"
  },
  {
    id: 265,
    title: "UGH!",
    artist: "BTS",
    src: "/audio/BTS_-_UGH_68489608.mp3",
    fullSrc: "/audio/BTS_-_UGH_68489608.mp3",
    cover: "/covers/BTS - UGH 68489608.jpeg",
    type: "track"
  },
  {
    id: 266,
    title: "August",
    artist: "Intelligency",
    src: "/audio/Intelligency_-_August_69052573.mp3",
    fullSrc: "/audio/Intelligency_-_August_69052573.mp3",
    cover: "/covers/Intelligency - August 69052573.jpeg",
    type: "track"
  },
  {
    id: 267,
    title: "Burn It Down",
    artist: "Linkin Park",
    src: "/audio/Linkin_Park_-_Burn_It_Down_47894866.mp3",
    fullSrc: "/audio/Linkin_Park_-_Burn_It_Down_47894866.mp3",
    cover: "/covers/Linkin Park - Burn It Down 47894866.jpeg",
    type: "track"
  },
  {
    id: 268,
    title: "Born For This",
    artist: "The Score",
    src: "/audio/The_Score_-_Born_For_This_61821289.mp3",
    fullSrc: "/audio/The_Score_-_Born_For_This_61821289.mp3",
    cover: "/covers/The Score - Born For This 61821289.jpeg",
    type: "track"
  },
  {
    id: 269,
    title: "Fighter",
    artist: "The Score",
    src: "/audio/The_Score_-_Fighter_73945312.mp3",
    fullSrc: "/audio/The_Score_-_Fighter_73945312.mp3",
    cover: "/covers/The Score - Fighter 73945312.jpeg",
    type: "track"
  },
  {
    id: 270,
    title: "Head Up",
    artist: "The Score",
    src: "/audio/The_Score_-_Head_Up_73172695.mp3",
    fullSrc: "/audio/The_Score_-_Head_Up_73172695.mp3",
    cover: "/covers/The Score - Head Up 73172695.jpeg",
    type: "track"
  },
  {
    id: 271,
    title: "Legend",
    artist: "The Score",
    src: "/audio/The_Score_-_Legend_49519310.mp3",
    fullSrc: "/audio/The_Score_-_Legend_49519310.mp3",
    cover: "/covers/The Score - Legend 49519310.jpeg",
    type: "track"
  },
  {
    id: 272,
    title: "Stronger",
    artist: "The Score",
    src: "/audio/The_Score_-_Stronger_58879747.mp3",
    fullSrc: "/audio/The_Score_-_Stronger_58879747.mp3",
    cover: "/covers/The Score - Stronger 58879747.jpeg",
    type: "track"
  },
  {
    id: 268,
    title: "Born For This",
    artist: "The Score",
    src: "/audio/The_Score_-_Born_For_This_61821289.mp3",
    fullSrc: "/audio/The_Score_-_Born_For_This_61821289.mp3",
    cover: "/covers/The Score - Born For This 61821289.jpeg",
    type: "track"
  },
  {
    id: 269,
    title: "Fighter",
    artist: "The Score",
    src: "/audio/The_Score_-_Fighter_73945312.mp3",
    fullSrc: "/audio/The_Score_-_Fighter_73945312.mp3",
    cover: "/covers/The Score - Fighter 73945312.jpeg",
    type: "track"
  },
  {
    id: 270,
    title: "Head Up",
    artist: "The Score",
    src: "/audio/The_Score_-_Head_Up_73172695.mp3",
    fullSrc: "/audio/The_Score_-_Head_Up_73172695.mp3",
    cover: "/covers/The Score - Head Up 73172695.jpeg",
    type: "track"
  },
  {
    id: 271,
    title: "Legend",
    artist: "The Score",
    src: "/audio/The_Score_-_Legend_49519310.mp3",
    fullSrc: "/audio/The_Score_-_Legend_49519310.mp3",
    cover: "/covers/The Score - Legend 49519310.jpeg",
    type: "track"
  },
  {
    id: 272,
    title: "Stronger",
    artist: "The Score",
    src: "/audio/The_Score_-_Stronger_58879747.mp3",
    fullSrc: "/audio/The_Score_-_Stronger_58879747.mp3",
    cover: "/covers/The Score - Stronger 58879747.jpeg",
    type: "track"
  },
  {
    id: 273,
    title: "Unstoppable",
    artist: "The Score",
    src: "/audio/The_Score_-_Unstoppable_49519316.mp3",
    fullSrc: "/audio/The_Score_-_Unstoppable_49519316.mp3",
    cover: "/covers/The Score - Unstoppable 49519316.jpeg",
    type: "track"
  },
  {
    id: 274,
    title: "Believer",
    artist: "Imagine Dragons",
    src: "/audio/Imagine_Dragons_-_Believer_47847788.mp3",
    fullSrc: "/audio/Imagine_Dragons_-_Believer_47847788.mp3",
    cover: "/covers/Imagine Dragons - Believer 47847788.jpeg",
    type: "track"
  },
  {
    id: 275,
    title: "Bones",
    artist: "Imagine Dragons",
    src: "/audio/Imagine_Dragons_-_Bones_73949726.mp3",
    fullSrc: "/audio/Imagine_Dragons_-_Bones_73949726.mp3",
    cover: "/covers/Imagine Dragons - Bones 73949726.jpeg",
    type: "track"
  },
  {
    id: 276,
    title: "Bones",
    artist: "Imagine Dragons",
    src: "/audio/Imagine_Dragons_-_Bones_75940783.mp3",
    fullSrc: "/audio/Imagine_Dragons_-_Bones_75940783.mp3",
    cover: "/covers/Imagine Dragons - Bones 75940783.jpeg",
    type: "track"
  },
  {
    id: 277,
    title: "Bullet In A Gun",
    artist: "Imagine Dragons",
    src: "/audio/Imagine_Dragons_-_Bullet_In_A_Gun_60254032.mp3",
    fullSrc: "/audio/Imagine_Dragons_-_Bullet_In_A_Gun_60254032.mp3",
    cover: "/covers/Imagine Dragons - Bullet In A Gun 60254032.jpeg",
    type: "track"
  },
  {
    id: 278,
    title: "Cutthroat",
    artist: "Imagine Dragons",
    src: "/audio/Imagine_Dragons_-_Cutthroat_72848542.mp3",
    fullSrc: "/audio/Imagine_Dragons_-_Cutthroat_72848542.mp3",
    cover: "/covers/Imagine Dragons - Cutthroat 72848542.jpeg",
    type: "track"
  },
  {
    id: 279,
    title: "Digital",
    artist: "Imagine Dragons",
    src: "/audio/Imagine_Dragons_-_Digital_60254033.mp3",
    fullSrc: "/audio/Imagine_Dragons_-_Digital_60254033.mp3",
    cover: "/covers/Imagine Dragons - Digital 60254033.jpeg",
    type: "track"
  },
  {
    id: 280,
    title: "Follow You",
    artist: "Imagine Dragons",
    src: "/audio/Imagine_Dragons_-_Follow_You_72848541.mp3",
    fullSrc: "/audio/Imagine_Dragons_-_Follow_You_72848541.mp3",
    cover: "/covers/Imagine Dragons - Follow You 72848541.jpeg",
    type: "track"
  },
  {
    id: 281,
    title: "Giants",
    artist: "Imagine Dragons",
    src: "/audio/Imagine_Dragons_-_Giants_73145358.mp3",
    fullSrc: "/audio/Imagine_Dragons_-_Giants_73145358.mp3",
    cover: "/covers/Imagine Dragons - Giants 73145358.jpeg",
    type: "track"
  },
  {
    id: 282,
    title: "I’m So Sorry",
    artist: "Imagine Dragons",
    src: "/audio/Imagine_Dragons_-_Im_So_Sorry_47829287.mp3",
    fullSrc: "/audio/Imagine_Dragons_-_Im_So_Sorry_47829287.mp3",
    cover: "/covers/Imagine Dragons - Im So Sorry 47829287.jpeg",
    type: "track"
  },
  {
    id: 283,
    title: "I Don’t Know Why",
    artist: "Imagine Dragons",
    src: "/audio/Imagine_Dragons_-_I_Dont_Know_Why_47828246.mp3",
    fullSrc: "/audio/Imagine_Dragons_-_I_Dont_Know_Why_47828246.mp3",
    cover: "/covers/Imagine Dragons - I Dont Know Why 47828246.jpeg",
    type: "track"
  },
  {
    id: 284,
    title: "Lonely",
    artist: "Imagine Dragons",
    src: "/audio/Imagine_Dragons_-_Lonely_73145354.mp3",
    fullSrc: "/audio/Imagine_Dragons_-_Lonely_73145354.mp3",
    cover: "/covers/Imagine Dragons - Lonely 73145354.jpeg",
    type: "track"
  },
  {
    id: 285,
    title: "Machine",
    artist: "Imagine Dragons",
    src: "/audio/Imagine_Dragons_-_Machine_60079045.mp3",
    fullSrc: "/audio/Imagine_Dragons_-_Machine_60079045.mp3",
    cover: "/covers/Imagine Dragons - Machine 60079045.jpeg",
    type: "track"
  },
  {
    id: 286,
    title: "Monster",
    artist: "Imagine Dragons",
    src: "/audio/Imagine_Dragons_-_Monster_47829307.mp3",
    fullSrc: "/audio/Imagine_Dragons_-_Monster_47829307.mp3",
    cover: "/covers/Imagine Dragons - Monster 47829307.jpeg",
    type: "track"
  },
  {
    id: 287,
    title: "Roots",
    artist: "Imagine Dragons",
    src: "/audio/Imagine_Dragons_-_Roots_64301473.mp3",
    fullSrc: "/audio/Imagine_Dragons_-_Roots_64301473.mp3",
    cover: "/covers/Imagine Dragons - Roots 64301473.jpeg",
    type: "track"
  },
  {
    id: 288,
    title: "Sharks",
    artist: "Imagine Dragons",
    src: "/audio/Imagine_Dragons_-_Sharks_75941262.mp3",
    fullSrc: "/audio/Imagine_Dragons_-_Sharks_75941262.mp3",
    cover: "/covers/Imagine Dragons - Sharks 75941262.jpeg",
    type: "track"
  },
  {
    id: 289,
    title: "Sirens",
    artist: "Imagine Dragons",
    src: "/audio/Imagine_Dragons_-_Sirens_78160472.mp3",
    fullSrc: "/audio/Imagine_Dragons_-_Sirens_78160472.mp3",
    cover: "/covers/Imagine Dragons - Sirens 78160472.jpeg",
    type: "track"
  },
  {
    id: 290,
    title: "Thunder",
    artist: "Imagine Dragons",
    src: "/audio/Imagine_Dragons_-_Thunder_47828258.mp3",
    fullSrc: "/audio/Imagine_Dragons_-_Thunder_47828258.mp3",
    cover: "/covers/Imagine Dragons - Thunder 47828258.jpeg",
    type: "track"
  },
  {
    id: 291,
    title: "Warriors",
    artist: "Imagine Dragons",
    src: "/audio/Imagine_Dragons_-_Warriors_47829305.mp3",
    fullSrc: "/audio/Imagine_Dragons_-_Warriors_47829305.mp3",
    cover: "/covers/Imagine Dragons - Warriors 47829305.jpeg",
    type: "track"
  },
  {
    id: 292,
    title: "Enemy",
    artist: "Imagine Dragons, J.I.D, League of Legends",
    src: "/audio/Imagine_Dragons_JID_League_of_Legends_-_Enemy_73245791.mp3",
    fullSrc: "/audio/Imagine_Dragons_JID_League_of_Legends_-_Enemy_73245791.mp3",
    cover: "/covers/Imagine Dragons JID League of Legends - Enemy 73245791.jpeg",
    type: "track"
  },
  {
    id: 293,
    title: "Revolution",
    artist: "The Score",
    src: "/audio/The_Score_-_Revolution_49519337.mp3",
    fullSrc: "/audio/The_Score_-_Revolution_49519337.mp3",
    cover: "/covers/The Score - Revolution 49519337.jpeg",
    type: "track"
  },
  {
    id: 294,
    title: "Choker",
    artist: "twenty one pilots",
    src: "/audio/twenty_one_pilots_-_Choker_72934755.mp3",
    fullSrc: "/audio/twenty_one_pilots_-_Choker_72934755.mp3",
    cover: "/covers/twenty one pilots - Choker 72934755.jpeg",
    type: "track"
  },
  {
    id: 295,
    title: "Fairly Local",
    artist: "twenty one pilots",
    src: "/audio/Twenty_One_Pilots_-_Fairly_Local_47828701.mp3",
    fullSrc: "/audio/Twenty_One_Pilots_-_Fairly_Local_47828701.mp3",
    cover: "/covers/Twenty One Pilots - Fairly Local 47828701.jpeg",
    type: "track"
  },
  {
    id: 296,
    title: "Hometown",
    artist: "twenty one pilots",
    src: "/audio/Twenty_One_Pilots_-_Hometown_47828710.mp3",
    fullSrc: "/audio/Twenty_One_Pilots_-_Hometown_47828710.mp3",
    cover: "/covers/Twenty One Pilots - Hometown 47828710.jpeg",
    type: "track"
  },
  {
    id: 297,
    title: "Lane Boy",
    artist: "twenty one pilots",
    src: "/audio/Twenty_One_Pilots_-_Lane_Boy_47828703.mp3",
    fullSrc: "/audio/Twenty_One_Pilots_-_Lane_Boy_47828703.mp3",
    cover: "/covers/Twenty One Pilots - Lane Boy 47828703.jpeg",
    type: "track"
  },
  {
    id: 298,
    title: "Message Man",
    artist: "twenty one pilots",
    src: "/audio/Twenty_One_Pilots_-_Message_Man_47828709.mp3",
    fullSrc: "/audio/Twenty_One_Pilots_-_Message_Man_47828709.mp3",
    cover: "/covers/Twenty One Pilots - Message Man 47828709.jpeg",
    type: "track"
  },
  {
    id: 299,
    title: "Polarize",
    artist: "twenty one pilots",
    src: "/audio/Twenty_One_Pilots_-_Polarize_47828706.mp3",
    fullSrc: "/audio/Twenty_One_Pilots_-_Polarize_47828706.mp3",
    cover: "/covers/Twenty One Pilots - Polarize 47828706.jpeg",
    type: "track"
  },
  {
    id: 300,
    title: "Tear In My Heart",
    artist: "twenty one pilots",
    src: "/audio/Twenty_One_Pilots_-_Tear_In_My_Heart_47828702.mp3",
    fullSrc: "/audio/Twenty_One_Pilots_-_Tear_In_My_Heart_47828702.mp3",
    cover: "/covers/Twenty One Pilots - Tear In My Heart 47828702.jpeg",
    type: "track"
  },
  {
    id: 301,
    title: "Believer",
    artist: "Imagine Dragons",
    src: "/audio/Imagine_Dragons_-_Believer_74640917.mp3",
    fullSrc: "/audio/Imagine_Dragons_-_Believer_74640917.mp3",
    cover: "/covers/Imagine Dragons - Believer 74640917.jpeg",
    type: "track"
  },
  {
    id: 302,
    title: "Выпускной (Медлячок)",
    artist: "Баста",
    src: "/audio/Баста - Выпускной Медлячок.mp3",
    fullSrc: "/audio/Баста - Выпускной Медлячок.mp3",
    cover: "/covers/Баста - Выпускной Медлячок.jpg",
    type: "track"
  },
  {
    id: 303,
    title: "Ангел хранитель",
    artist: "Сухарев Дмитрий",
    src: "/audio/Ангел хранитель  - Сухарев Дмитрий.mp3",
    fullSrc: "/audio/Ангел хранитель  - Сухарев Дмитрий.mp3",
    cover: "/covers/Сухарев Дмитрий.jpg",
    type: "track"
  },
  {
    id: 304,
    title: "Волчий след",
    artist: "Сухарев Дмитрий",
    src: "/audio/Волчий след  - Сухарев Дмитрий.mp3",
    fullSrc: "/audio/Волчий след  - Сухарев Дмитрий.mp3",
    cover: "/covers/Сухарев Дмитрий.jpg",
    type: "track"
  },
  {
    id: 305,
    title: "Змея",
    artist: "Сухарев Дмитрий",
    src: "/audio/Змея - Сухарев Дмитрий.mp3",
    fullSrc: "/audio/Змея - Сухарев Дмитрий.mp3",
    cover: "/covers/Сухарев Дмитрий.jpg",
    type: "track"
  },
  {
    id: 306,
    title: "На вершине мира",
    artist: "Сухарев Дмитрий",
    src: "/audio/На вершине мира - Сухарев Дмитрий.mp3",
    fullSrc: "/audio/На вершине мира - Сухарев Дмитрий.mp3",
    cover: "/covers/Сухарев Дмитрий.jpg",
    type: "track"
  },
  {
    id: 307,
    title: "Шторм",
    artist: "Сухарев Дмитрий",
    src: "/audio/Шторм - Сухарев Дмитрий.mp3",
    fullSrc: "/audio/Шторм - Сухарев Дмитрий.mp3",
    cover: "/covers/Сухарев Дмитрий.jpg",
    type: "track"
  },
  {
    id: 308,
    title: "Tokyo 東京",
    artist: "7vvch, MVDNES",
    src: "/audio/7vvch_MVDNES_-_Tokyo__74705048.mp3",
    fullSrc: "/audio/7vvch_MVDNES_-_Tokyo__74705048.mp3",
    cover: "/covers/7vvch MVDNES - Tokyo  74705048.png",
    type: "track"
  },
  {
    id: 309,
    title: "Город Омск",
    artist: "Смешарики, Александр Шпынев, Сергей Мардарь, Антон Виноградов, Марина Ланда",
    src: "/audio/Aleksandr_SHpynev_Sergejj_Mardar_Anton_Vinogradov_Marina_Landa_-_Gorod_Omsk_68991363.mp3",
    fullSrc: "/audio/Aleksandr_SHpynev_Sergejj_Mardar_Anton_Vinogradov_Marina_Landa_-_Gorod_Omsk_68991363.mp3",
    cover: "/covers/Aleksandr SHpynev Sergejj Mardar Anton Vinogradov Marina Landa - Gorod Omsk 68991363.jpeg",
    type: "track"
  },
  {
    id: 310,
    title: "DON'T STOP",
    artist: "CURSEDEVIL, Zackow",
    src: "/audio/CURSEDEVIL_Zackow_-_DONT_STOP_74705051.mp3",
    fullSrc: "/audio/CURSEDEVIL_Zackow_-_DONT_STOP_74705051.mp3",
    cover: "/covers/CURSEDEVIL Zackow - DONT STOP 74705051.jpeg",
    type: "track"
  },
  {
    id: 311,
    title: "Autumn Wind",
    artist: "DVRST",
    src: "/audio/DVRST_-_Autumn_Wind_73427298.mp3",
    fullSrc: "/audio/DVRST_-_Autumn_Wind_73427298.mp3",
    cover: "/covers/DVRST - Autumn Wind 73427298.jpeg",
    type: "track"
  },
  {
    id: 312,
    title: "Close Eyes",
    artist: "DVRST",
    src: "/audio/DVRST_-_Close_Eyes_73006469.mp3",
    fullSrc: "/audio/DVRST_-_Close_Eyes_73006469.mp3",
    cover: "/covers/DVRST - Close Eyes 73006469.jpeg",
    type: "track"
  },
  {
    id: 313,
    title: "Dream Space (Sped Up)",
    artist: "DVRST",
    src: "/audio/DVRST_-_Dream_Space_Sped_Up_74682978.mp3",
    fullSrc: "/audio/DVRST_-_Dream_Space_Sped_Up_74682978.mp3",
    cover: "/covers/DVRST - Dream Space Sped Up 74682978.jpeg",
    type: "track"
  },
  {
    id: 314,
    title: "My Toy",
    artist: "DVRST",
    src: "/audio/DVRST_-_My_Toy_74650660.mp3",
    fullSrc: "/audio/DVRST_-_My_Toy_74650660.mp3",
    cover: "/covers/DVRST - My Toy 74650660.jpeg",
    type: "track"
  },
  {
    id: 315,
    title: "Phonk Web",
    artist: "Dxrk ダーク",
    src: "/audio/Dxrk_-_Phonk_Web_73377729.mp3",
    fullSrc: "/audio/Dxrk_-_Phonk_Web_73377729.mp3",
    cover: "/covers/Dxrk - Phonk Web 73377729.jpeg",
    type: "track"
  },
  {
    id: 316,
    title: "FIGHT!",
    artist: "Moondeity",
    src: "/audio/Moondeity_-_FIGHT_74660136.mp3",
    fullSrc: "/audio/Moondeity_-_FIGHT_74660136.mp3",
    cover: "/covers/Moondeity - FIGHT 74660136.jpeg",
    type: "track"
  },
  {
    id: 317,
    title: "CURSED",
    artist: "Moondeity, Dxrk ダーク",
    src: "/audio/Moondeity_Dxrk_-_CURSED_74672622.mp3",
    fullSrc: "/audio/Moondeity_Dxrk_-_CURSED_74672622.mp3",
    cover: "/covers/Moondeity Dxrk - CURSED 74672622.jpeg",
    type: "track"
  },
  {
    id: 318,
    title: "Vanished",
    artist: "Narvent",
    src: "/audio/Narvent_-_Vanished_74671182.mp3",
    fullSrc: "/audio/Narvent_-_Vanished_74671182.mp3",
    cover: "/covers/Narvent - Vanished 74671182.jpeg",
    type: "track"
  },
  {
    id: 319,
    title: "RAID",
    artist: "NOAIR CREW, VOLT VISION",
    src: "/audio/NOAIR_CREW_VOLT_VISION_-_RAID_74667093.mp3",
    fullSrc: "/audio/NOAIR_CREW_VOLT_VISION_-_RAID_74667093.mp3",
    cover: "/covers/NOAIR CREW VOLT VISION - RAID 74667093.jpeg",
    type: "track"
  },
  {
    id: 320,
    title: "Марафонец",
    artist: "Сергей Васильев",
    src: "/audio/Sergejj_Vasilev_-_Marafonec_68991381.mp3",
    fullSrc: "/audio/Sergejj_Vasilev_-_Marafonec_68991381.mp3",
    cover: "/covers/Sergejj Vasilev - Marafonec 68991381.jpeg",
    type: "track"
  },
  {
    id: 321,
    title: "KNIGHT",
    artist: "SHADXWBXRN",
    src: "/audio/SHADXWBXRN_-_KNIGHT_73923410.mp3",
    fullSrc: "/audio/SHADXWBXRN_-_KNIGHT_73923410.mp3",
    cover: "/covers/SHADXWBXRN - KNIGHT 73923410.jpeg",
    type: "track"
  },
  {
    id: 322,
    title: "А мы валяем дурака",
    artist: "Смешарики",
    src: "/audio/Smeshariki_-_A_my_valyaem_duraka_74649560.mp3",
    fullSrc: "/audio/Smeshariki_-_A_my_valyaem_duraka_74649560.mp3",
    cover: "/covers/Smeshariki - A my valyaem duraka 74649560.jpeg",
    type: "track"
  },
  {
    id: 323,
    title: "Индийский чай",
    artist: "Смешарики",
    src: "/audio/Smeshariki_-_Indijjskijj_chajj_74725116.mp3",
    fullSrc: "/audio/Smeshariki_-_Indijjskijj_chajj_74725116.mp3",
    cover: "/covers/Smeshariki - Indijjskijj chajj 74725116.jpeg",
    type: "track"
  },
  {
    id: 324,
    title: "Индийский чай",
    artist: "Смешарики",
    src: "/audio/Smeshariki_-_Indijjskijj_chajj_77848442.mp3",
    fullSrc: "/audio/Smeshariki_-_Indijjskijj_chajj_77848442.mp3",
    cover: "/covers/Smeshariki - Indijjskijj chajj 77848442.jpeg",
    type: "track"
  },
  {
    id: 325,
    title: "M.E.D. Phonk",
    artist: "Смешарики",
    src: "/audio/Smeshariki_-_MED_Phonk_75451193.mp3",
    fullSrc: "/audio/Smeshariki_-_MED_Phonk_75451193.mp3",
    cover: "/covers/Smeshariki - MED Phonk 75451193.jpeg",
    type: "track"
  },
  {
    id: 326,
    title: "Мы не смеемся",
    artist: "Смешарики",
    src: "/audio/Smeshariki_-_My_ne_smeemsya_74649561.mp3",
    fullSrc: "/audio/Smeshariki_-_My_ne_smeemsya_74649561.mp3",
    cover: "/covers/Smeshariki - My ne smeemsya 74649561.jpeg",
    type: "track"
  },
  {
    id: 327,
    title: "Неприятности",
    artist: "Смешарики",
    src: "/audio/Smeshariki_-_Nepriyatnosti_78004572.mp3",
    fullSrc: "/audio/Smeshariki_-_Nepriyatnosti_78004572.mp3",
    cover: "/covers/Smeshariki - Nepriyatnosti 78004572.jpeg",
    type: "track"
  },
  {
    id: 328,
    title: "Огурец Phonk",
    artist: "Смешарики",
    src: "/audio/Smeshariki_-_Ogurec_Phonk_77652171.mp3",
    fullSrc: "/audio/Smeshariki_-_Ogurec_Phonk_77652171.mp3",
    cover: "/covers/Smeshariki - Ogurec Phonk 77652171.jpeg",
    type: "track"
  },
  {
    id: 329,
    title: "O.M.S.K. Phonk",
    artist: "Смешарики",
    src: "/audio/Smeshariki_-_OMSK_Phonk_75371957.mp3",
    fullSrc: "/audio/Smeshariki_-_OMSK_Phonk_75371957.mp3",
    cover: "/covers/Smeshariki - OMSK Phonk 75371957.jpeg",
    type: "track"
  },
  {
    id: 330,
    title: "От винта!",
    artist: "Смешарики",
    src: "/audio/Smeshariki_-_Ot_vinta_48225827.mp3",
    fullSrc: "/audio/Smeshariki_-_Ot_vinta_48225827.mp3",
    cover: "/covers/Smeshariki - Ot vinta 48225827.jpeg",
    type: "track"
  },
  {
    id: 331,
    title: "От Винта!",
    artist: "Смешарики",
    src: "/audio/Smeshariki_-_Ot_Vinta_73000062.mp3",
    fullSrc: "/audio/Smeshariki_-_Ot_Vinta_73000062.mp3",
    cover: "/covers/Smeshariki - Ot Vinta 73000062.jpeg",
    type: "track"
  },
  {
    id: 332,
    title: "Вести-бу-би-лю-би-бу",
    artist: "Смешарики",
    src: "/audio/Smeshariki_-_Vesti-bu-bi-lyu-bi-bu_74649540.mp3",
    fullSrc: "/audio/Smeshariki_-_Vesti-bu-bi-lyu-bi-bu_74649540.mp3",
    cover: "/covers/Smeshariki - Vesti-bu-bi-lyu-bi-bu 74649540.jpeg",
    type: "track"
  },
  {
    id: 333,
    title: "Ягода малинка",
    artist: "Смешарики, DVRST",
    src: "/audio/Smeshariki_DVRST_-_YAgoda_malinka_74725118.mp3",
    fullSrc: "/audio/Smeshariki_DVRST_-_YAgoda_malinka_74725118.mp3",
    cover: "/covers/Smeshariki DVRST - YAgoda malinka 74725118.jpeg",
    type: "track"
  },
  {
    id: 334,
    title: "|BONKERS|",
    artist: "Staplegun",
    src: "/audio/Staplegun_-_BONKERS_74684326.mp3",
    fullSrc: "/audio/Staplegun_-_BONKERS_74684326.mp3",
    cover: "/covers/Staplegun - BONKERS 74684326.jpeg",
    type: "track"
  },
  {
    id: 335,
    title: "METAMORPHOSIS",
    artist: "INTERWORLD",
    src: "/audio/INTERWORLD_-_METAMORPHOSIS_73761657.mp3",
    fullSrc: "/audio/INTERWORLD_-_METAMORPHOSIS_73761657.mp3",
    cover: "/covers/INTERWORLD - METAMORPHOSIS 73761657.jpeg",
    type: "track"
  },
  {
    id: 336,
    title: "Scopin",
    artist: "Kordhell",
    src: "/audio/Kordhell_-_Scopin_74192307.mp3",
    fullSrc: "/audio/Kordhell_-_Scopin_74192307.mp3",
    cover: "/covers/Kordhell - Scopin 74192307.jpeg",
    type: "track"
  },
  {
    id: 337,
    title: "9mm",
    artist: "Memphis Cult, Groove Dealers, SPLYXER",
    src: "/audio/Memphis_Cult_Groove_Dealers_SPLYXER_-_9mm_77013507.mp3",
    fullSrc: "/audio/Memphis_Cult_Groove_Dealers_SPLYXER_-_9mm_77013507.mp3",
    cover: "/covers/Memphis Cult Groove Dealers SPLYXER - 9mm 77013507.jpeg",
    type: "track"
  },
  {
    id: 338,
    title: "VISION",
    artist: "UdieNnx, HXVSAGE",
    src: "/audio/UdieNnx_HXVSAGE_-_VISION_79123722.mp3",
    fullSrc: "/audio/UdieNnx_HXVSAGE_-_VISION_79123722.mp3",
    cover: "/covers/UdieNnx HXVSAGE - VISION 79123722.jpeg",
    type: "track"
  },
  {
    id: 339,
    title: "BAIXO",
    artist: "xxanteria",
    src: "/audio/xxanteria_-_BAIXO_77657574.mp3",
    fullSrc: "/audio/xxanteria_-_BAIXO_77657574.mp3",
    cover: "/covers/xxanteria - BAIXO 77657574.jpeg",
    type: "track"
  },
  {
    id: 340,
    title: "Happy",
    artist: "Pharrell Williams",
    src: "/audio/Pharrell_Williams_-_Happy_47923895.mp3",
    fullSrc: "/audio/Pharrell_Williams_-_Happy_47923895.mp3",
    cover: "/covers/Pharrell Williams - Happy 47923895.jpeg",
    type: "track"
  }
];







export const initialPlaylists: Playlist[] = [
  {
    id: 0,
    title: 'все треки',
    cover: '/covers/playlists/allTracks.png',
    tracks: initialTracks, 
    isPlaying: false,
    category: 'other',
    type: 'playlist',
  },
  {
    id: 1,
    title: 'LOOM',
    cover: '/covers/playlists/loom.jpg', 
    tracks: [initialTracks[56],initialTracks[78], initialTracks[13], ...initialTracks.slice(71, 78)], 
    isPlaying: false,
    category: 'album',
    type: 'playlist',
    colors: {
        text: "#ded0ac",
        button: "#c56b57",
    }
  },
  {
    id: 2,
    title: 'Микс!',
    cover: '/covers/playlists/high_mix.jpg',
    tracks: initialTracks.filter(track => 
      track.id === 5 ||  // Faint - Linkin Park
      track.id === 16 || // LALALALA (Rock Ver.) - Stray Kids
      track.id === 19 || // Overcompensate - Twenty One Pilots
      track.id === 20 || // Smells Like Teen Spirit - Nirvana
      track.id === 29 || // Lane Boy - Twenty One Pilots
      track.id === 30 || // Jerk it out - Caesars Palace
      track.id === 44 || // Chk Chk Boom - Stray Kids
      track.id === 53 || // Can't Stop - Red Hot Chili Peppers
      track.id === 103 || // Coming Undone - Korn
      track.id === 104 || // Freak On a Leash - Korn
      track.id === 108 || // Break Stuff - Limp Bizkit
      track.id === 138 || // Give It Away - Red Hot Chili Peppers
      track.id === 236 || // Rollin' - Limp Bizkit
      track.id === 253 || // Twist - Korn
      track.id === 267 || // Burn It Down - Linkin Park
      track.id === 293    // Revolution - The Score
    ),
    isPlaying: false,
    category: 'playlist',
    type: 'playlist',
    
  },
  {
    id: 3,
    title: 'Ретро Микс',
    cover: '/covers/playlists/retro_mix.jpg',
    tracks: initialTracks.filter(track => 
      track.id === 99 ||  // Billie Jean - Michael Jackson
      track.id === 100 || // Smooth Criminal - Michael Jackson
      track.id === 101 || // Thriller - Michael Jackson
      track.id === 119 || // Stayin Alive - Bee Gees
      track.id === 120 || // Baby Baby - Corona
      track.id === 121 || // Think About the Way - Ice MC
      track.id === 125 || // Get A Way - Maxx
      track.id === 128 || // Right Round - Flo Rida
      track.id === 129 || // LoveGame - Lady Gaga
      track.id === 130 || // Paparazzi - Lady Gaga
      track.id === 133 || // Sexy And I Know It - LMFAO
      track.id === 134 || // Party Rock Anthem - LMFAO
      track.id === 135 || // Moves Like Jagger - Maroon 5
      track.id === 151 || // The Rhythm of the Night - Corona
      track.id === 154 || // Pump Up The Jam - Technotronic
      track.id === 157 || // No Limit - 2 Unlimited
      track.id === 161 || // Be My Lover - La Bouche
      track.id === 164 || // Take on Me - a-ha
      track.id === 166 || // Daddy Cool - Boney M.
      track.id === 168 || // Hot Stuff - Donna Summer
      track.id === 170 || // Boogie Wonderland - Earth, Wind & Fire
      track.id === 189    // Gonna Make You Sweat - C+C Music Factory
    ),
    isPlaying: false,
    category: 'playlist',
    type: 'playlist',
    
  },
  {
    id: 4,
    title: 'Favourite Worst Nightmare',
    cover: '/covers/playlists/Favourite_Worst_Nightmare.jpg', 
    tracks: [ ...initialTracks.slice(57, 65),  ...initialTracks.slice(66, 70)], 
    isPlaying: false,
    category: 'album',
    type: 'playlist', 
    // colors: {
    //   button: '#252640',
    //   icon: '#D9BFFE',
    //   text: '#292C4D',
    // }
  },
  {
    id: 5,
    title: 'Clancy',
    cover: '/covers/Overcompensate.jpg', 
    tracks: [initialTracks[19], initialTracks[23], ...initialTracks.slice(32, 43)], 
    isPlaying: false,
    category: 'album',
    type: 'playlist',
    colors: {
      button: '#F2CF1D',
      icon: '#262626',
      text: '#F2CF1D',
    }
  },
  {
    id: 6,
    title: 'Big Dawgs',
    cover: '/covers/playlists/Big_Dawgs.jpg', 
    tracks: [initialTracks[28]], 
    isPlaying: false,
    category: 'single',
    type: 'playlist',
  },
  {
    id: 7,
    title: 'ATE',
    cover: '/covers/ATE.jpg', 
    tracks: [ ...initialTracks.slice(43, 51)], 
    isPlaying: false,
    category: 'album',
    type: 'playlist',
  },
  {
    id: 9,
    title: 'Lose My Breath (Feat. Charlie Puth)',
    cover: '/covers/Lose_My_Breath.jpg', 
    tracks: [initialTracks[51]], 
    isPlaying: false,
    category: 'single',
    type: 'playlist',
    colors: {
      button: '#9ED3FFFF',
      icon: '#000000',
      text: '#9ED3FFFF',
    }
  },
  {
    id: 10,
    title: 'Mingle',
    cover: '/covers/mingle.png', 
    tracks: [initialTracks[0]], 
    isPlaying: false,
    category: 'single',
    type: 'playlist',
    colors: {
      button: '#01041E',
      icon: '#F1DFF1',
      text: '#F1DFF1',
    }
  },
  {
    id: 11,
    title: 'Skinny Loser',
    cover: '/covers/playlists/Skinny_Loser.png', 
    tracks: [initialTracks[52]], 
    isPlaying: false,
    category: 'single',
    type: 'playlist',
    colors: {
      button: '#9EA68F',
      icon: '#141512',
      text: '#dce2d9',
    }
  },
  {
    id: 12,
    title: 'stud.',
    cover: '/covers/playlists/stud.png', 
    tracks: [
      {
        id: 79,
        title: "Были танцы",
        artist: "Бьянка",
        src: "/audio/Byanka_-_Byli_tancy_72332693.mp3",
        fullSrc: "/audio/Byanka_-_Byli_tancy_72332693.mp3",
        cover: "/covers/Byanka_-_Byli_tancy_72332693.jpeg",
        type: "track"
      },
      {
        id: 80,
        title: "140",
        artist: "IOWA",
        src: "/audio/IOWA - 140.mp3",
        fullSrc: "/audio/IOWA - 140.mp3",
        cover: "/covers/IOWA - 140.png",
        type: "track"
      },
      {
        id: 81,
        title: "Плохо танцевать",
        artist: "IOWA",
        src: "/audio/IOWA - Плохо танцевать.mp3",
        fullSrc: "/audio/IOWA - Плохо танцевать.mp3",
        cover: "/covers/IOWA - Плохо танцевать.png",
        type: "track"
      },
      {
        id: 82,
        title: "Яблоко",
        artist: "IOWA, Ёлка",
        src: "/audio/IOWA_JOlka_-_YAbloko_73061728.mp3",
        fullSrc: "/audio/IOWA_JOlka_-_YAbloko_73061728.mp3",
        cover: "/covers/IOWA_JOlka_-_YAbloko_73061728.jpeg",
        type: "track"
      },
      {
        id: 83,
        title: "До Луны (feat. Roma Bestseller)",
        artist: "Jah Khalib, Roma Bestseller",
        src: "/audio/stud/Jah Khalib, Roma Bestseller - Do Luny feat Roma Be.mp3",
        fullSrc: "/audio/stud/Jah Khalib, Roma Bestseller - Do Luny feat Roma Be.mp3",
        cover: "/covers/Jah Khalib, Roma Bestseller - Do Luny feat Roma Be.png",
        type: "track"
      },
      {
        id: 84,
        title: "Judas",
        artist: "Lady Gaga",
        src: "/audio/stud/Lady Gaga - Judas.mp3",
        fullSrc: "/audio/stud/Lady Gaga - Judas.mp3",
        cover: "/covers/Lady Gaga - Judas.png",
        type: "track"
      },
      {
        id: 85,
        title: "A Lot Of Money",
        artist: "Little Big",
        src: "/audio/stud/Little Big - A Lot Of Money.mp3",
        fullSrc: "/audio/stud/Little Big - A Lot Of Money.mp3",
        cover: "/covers/Little Big - A Lot Of Money.png",
        type: "track"
      },
      {
        id: 86,
        title: "Uptown Funk",
        artist: "Mark Ronson, Bruno Mars",
        src: "/audio/stud/Mark Ronson, Bruno Mars - Uptown Funk.mp3",
        fullSrc: "/audio/stud/Mark Ronson, Bruno Mars - Uptown Funk.mp3",
        cover: "/covers/Mark Ronson, Bruno Mars - Uptown Funk.png",
        type: "track"
      },
      {
        id: 87,
        title: "Beggin'",
        artist: "Måneskin",
        src: "/audio/stud/Mneskin_-_Beggin_52795146.mp3",
        fullSrc: "/audio/stud/Mneskin_-_Beggin_52795146.mp3",
        cover: "/covers/Mneskin_-_Beggin_52795146.png",
        type: "track"
      },
      {
        id: 88,
        title: "Миллионы голосов",
        artist: "Полина Гагарина",
        src: "/audio/stud/Polina_Gagarina_-_Milliony_golosov_63172450.mp3",
        fullSrc: "/audio/stud/Polina_Gagarina_-_Milliony_golosov_63172450.mp3",
        cover: "/covers/Polina_Gagarina_-_Milliony_golosov_63172450.png",
        type: "track"
      },
      {
        id: 89,
        title: "Матушка",
        artist: "Татьяна Куртукова",
        src: "/audio/stud/Tatyana_Kurtukova_-_Matushka_77620461.mp3",
        fullSrc: "/audio/stud/Tatyana_Kurtukova_-_Matushka_77620461.mp3",
        cover: "/covers/Tatyana_Kurtukova_-_Matushka_77620461.jpeg",
        type: "track"
      },
      {
        id: 90,
        title: "Двигай",
        artist: "The Hatters",
        src: "/audio/stud/The Hatters - Dvigaj.mp3",
        fullSrc: "/audio/stud/The Hatters - Dvigaj.mp3",
        cover: "/covers/The Hatters - Dvigaj.png",
        type: "track"
      },
      {
        id: 91,
        title: "Танцы",
        artist: "The Hatters",
        src: "/audio/stud/The Hatters - Танцы.mp3",
        fullSrc: "/audio/stud/The Hatters - Танцы.mp3",
        cover: "/covers/The Hatters - Танцы.png",
        type: "track"
      },
      {
        id: 92,
        title: "Можно всё",
        artist: "Zivert",
        src: "/audio/stud/Zivert - Можно вс.mp3",
        fullSrc: "/audio/stud/Zivert - Можно вс.mp3",
        cover: "/covers/Zivert - Можно вс.png",
        type: "track"
      },
      {
        id: 93,
        title: "Коламбия Пикчерз не представляет",
        artist: "БАНД'ЭРОС",
        src: "/audio/stud/БАНД_ЭРОС_Коламбия_Пикчерз_не_представляет.mp3",
        fullSrc: "/audio/stud/БАНД_ЭРОС_Коламбия_Пикчерз_не_представляет.mp3",
        cover: "/covers/БАНД_ЭРОС_Коламбия_Пикчерз_не_представляет.jpeg",
        type: "track"
      },
      {
        id: 94,
        title: "Граница",
        artist: "Леонид Агутин & Отпетые Мошенники",
        src: "/audio/stud/Леонид_Агутин_Отпетые_Мошенники_Граница.mp3",
        fullSrc: "/audio/stud/Леонид_Агутин_Отпетые_Мошенники_Граница.mp3",
        cover: "/covers/no-cover.jpg",
        type: "track"
      },
      {
        id: 95,
        title: "Колыбельная Наташи",
        artist: "Наадя",
        src: "/audio/stud/Наадя - Колыбельная Наташи.mp3",
        fullSrc: "/audio/stud/Наадя - Колыбельная Наташи.mp3",
        cover: "/covers/Наадя - Колыбельная Наташи.jpeg",
        type: "track"
      },
      {
        id: 96,
        title: "Непохожие",
        artist: "Quest Pistols Show",
        src: "/audio/непохожи.mp3",
        fullSrc: "/audio/непохожи.mp3",
        cover: "/covers/непохожи.png",
        type: "track"
      },
      {
        id: 97,
        title: "Чайковский «Щелкунчик»",
        artist: "unknown",
        src: "/audio/Чайковский «Щелкунчик».m4a",
        fullSrc: "/audio/Чайковский «Щелкунчик».m4a",
        cover: "/covers/no-cover.jpg",
        type: "track"
      }
    ], 
    isPlaying: false,
    category: 'playlist',
    type: 'playlist',
    // colors: {
    //   button: '#9EA68F',
    //   icon: '#141512',
    //   text: '#dce2d9',
    // }
  },
  {
    id: 13,
    title: 'rock.',
    cover: '/covers/playlists/rock.jpg', 
    tracks: initialTracks.filter(track => 
      track.artist.includes('Linkin Park') ||
      track.artist.includes('Red Hot Chili Peppers') ||
      track.artist.includes('Nirvana') ||
      track.artist.includes('Arctic Monkeys') ||
      track.artist.includes('Korn') ||
      track.artist.includes('Limp Bizkit')
    ),
    isPlaying: false,
    category: 'playlist',
    type: 'playlist',
    // colors: {
    //   button: '#9EA68F',
    //   icon: '#141512',
    //   text: '#dce2d9',
    // }
  },
  {
  id: 14,
  title: 'PARANOIA (feat. BAEKHYUN, tobi lou, ZI & Cal Scruby)',
  cover: '/covers/HEARTSTEEL.jpg', 
  tracks: [initialTracks[54]], 
  isPlaying: false,
  category: 'single',
  type: 'playlist',
  // colors: {
  //   button: '#9EA68F',
  //   icon: '#141512',
  //   text: '#dce2d9',
  // }
  },
  {
    id: 15,
    title: 'SPOT!',
    cover: '/covers/SPOT.jpg', 
    tracks: [initialTracks[55]], 
    isPlaying: false,
    category: 'single',
    type: 'playlist',
    colors: {
      button: '#F2506E',
      icon: '#260101',
      text: '#D9BBB0',
    }
  },
    // Twenty One Pilots Collection
    {
      id: 16,
      title: 'Twenty One Pilots Essentials',
      cover: '/covers/playlists/twop_hits.jpg',
      tracks: initialTracks.filter(track => 
        track.artist.includes('Twenty One Pilots') || 
        track.artist.includes('twenty one pilots')
      ),
      isPlaying: false,
      category: 'playlist',
      type: 'playlist'
    },
  
    // Imagine Dragons Collection
    {
      id: 17,
      title: 'Imagine Dragons Greatest Hits',
      cover: '/covers/playlists/Imagine_Dragons_hits.jpg',
      tracks: initialTracks.filter(track => 
        track.artist.includes('Imagine Dragons')
      ),
      isPlaying: false,
      category: 'playlist',
      type: 'playlist'
    },
  
    // Треки с ID от 99 до 230
    {
      id: 18,
      title: 'dadudu',
      cover: '/covers/playlists/id_range.jpg',
      tracks: initialTracks.filter(track => 
        track.id >= 99 && track.id <= 230
      ),
      isPlaying: false,
      category: 'playlist',
      type: 'playlist'
    },
  
    // Pop Essentials
    {
      id: 20,
      title: 'Pop Hits 2000s-2020s',
      cover: '/covers/playlists/pop_hits.jpg',
      tracks: initialTracks.filter(track => 
        track.artist.includes('Lady Gaga') ||
        track.artist.includes('Maroon 5') ||
        track.artist.includes('The Weeknd') ||
        track.artist.includes('Billie Eilish') ||
        track.artist.includes('OneRepublic') ||
        track.artist.includes('Post Malone')
      ),
      isPlaying: false,
      category: 'playlist',
      type: 'playlist'
    },
  
    // Russian Hits
    {
      id: 21,
      title: 'Русские Хиты',
      cover: '/covers/playlists/russian_hits.jpg',
      tracks: initialTracks.filter(track => 
        track.artist.includes('IOWA') ||
        track.artist.includes('SEREBRO') ||
        track.artist.includes('Тимати') ||
        track.artist.includes('Quest Pistols') ||
        track.artist.includes('Дайте танк') ||
        track.artist.includes('Бьянка')
      ),
      isPlaying: false,
      category: 'playlist',
      type: 'playlist'
    },
  
    // Electronic/Dance
    {
      id: 22,
      title: 'Electronic Dance Mix',
      cover: '/covers/playlists/electronic_dance.jpg',
      tracks: initialTracks.filter(track => 
        track.artist.includes('Technotronic') ||
        track.artist.includes('2 Unlimited') ||
        track.artist.includes('La Bouche') ||
        track.artist.includes('Corona') ||
        track.artist.includes('Ice MC') ||
        track.artist.includes('INNA')
      ),
      isPlaying: false,
      category: 'playlist',
      type: 'playlist'
    },
  
    // 80s-90s Classics
    {
      id: 23,
      title: '80s & 90s Classics',
      cover: '/covers/playlists/80s_90s.jpg',
      tracks: initialTracks.filter(track => 
        track.artist.includes('Michael Jackson') ||
        track.artist.includes('Rick Astley') ||
        track.artist.includes('a-ha') ||
        track.artist.includes('Boney M.') ||
        track.artist.includes('Donna Summer') ||
        track.artist.includes('Bee Gees')
      ),
      isPlaying: false,
      category: 'playlist',
      type: 'playlist'
    },
  
    // Альбом "Ангел хранитель" Сухарева Дмитрия
    {
      id: 24,
      title: 'Ангел хранитель',
      cover: '/covers/playlists/angel.jpg',
      tracks: initialTracks.filter(track => 
        track.artist.includes('Сухарев Дмитрий')
      ),
      isPlaying: false,
      category: 'album',
      type: 'playlist'
    },
    {
      id: 25,
      title: 'Смешарики',
      cover: '/covers/playlists/smeshariki_best.jpg',
      tracks: initialTracks.filter(track => 
        track.id === 309 || // Город Омск
        track.id === 320 || // Марафонец
        track.id === 322 || // А мы валяем дурака
        track.id === 323 || // Индийский чай
        track.id === 324 || // Индийский чай (альтернативная версия)
        track.id === 326 || // Мы не смеемся
        track.id === 327 || // Неприятности
        track.id === 330 || // От винта!
        track.id === 331 || // От Винта! (альтернативная версия)
        track.id === 332 || // Вести-бу-би-лю-би-бу
        track.id === 325 ||  // M.E.D. Phonk - Смешарики
        track.id === 328 ||  // Огурец Phonk - Смешарики
        track.id === 329 ||  // O.M.S.K. Phonk - Смешарики
        track.id === 333  // Ягода малинка - Смешарики, DVRST
      ),
      isPlaying: false,
      colors: {
          text: "#43586b"
      },
      category: 'other',
      type: 'playlist',
    },
    {
      id: 26,
      title: 'Фонк',
      cover: '/covers/playlists/phonk.jpg',
      tracks: initialTracks.filter(track => 
        track.id === 308 ||  // Tokyo 東京 - 7vvch, MVDNES
        track.id === 310 ||  // DON'T STOP - CURSEDEVIL, Zackow
        track.id === 311 ||  // Autumn Wind - DVRST
        track.id === 312 ||  // Close Eyes - DVRST
        track.id === 313 ||  // Dream Space (Sped Up) - DVRST
        track.id === 314 ||  // My Toy - DVRST
        track.id === 315 ||  // Phonk Web - Dxrk ダーク
        track.id === 316 ||  // FIGHT! - Moondeity
        track.id === 317 ||  // CURSED - Moondeity, Dxrk
        track.id === 318 ||  // Vanished - Narvent
        track.id === 319 ||  // RAID - NOAIR CREW, VOLT VISION
        track.id === 321 ||  // KNIGHT - SHADXWBXRN
        track.id === 325 ||  // M.E.D. Phonk - Смешарики
        track.id === 328 ||  // Огурец Phonk - Смешарики
        track.id === 329 ||  // O.M.S.K. Phonk - Смешарики
        track.id === 333 ||  // Ягода малинка - Смешарики, DVRST
        track.id === 334 ||  // |BONKERS| - Staplegun
        track.id === 335 ||  // METAMORPHOSIS - INTERWORLD
        track.id === 336 ||  // Scopin - Kordhell
        track.id === 337 ||  // 9mm - Memphis Cult, Groove Dealers, SPLYXER
        track.id === 338 ||  // VISION - UdieNnx, HXVSAGE
        track.id === 339     // BAIXO - xxanteria
      ),
      isPlaying: false,
      category: 'other',
      type: 'playlist',
    }
];














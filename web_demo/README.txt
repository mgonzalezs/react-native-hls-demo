goals:
 1. enable clients to download only the audio bytes they need (eg, playing only a single verse from the chapter)
 2. enable clients to benefit adaptive bitrate streaming, and offer multiple audio qualities

comments:
 an HLS playlist for testing goal 1 is generated below (JHN_01.m3u8).  the playlist has not been tested in any way.
 proposed: use the client audio library to test this m3u8 and verify that goal 1 is accomplished (eg, client GETs only the necessary bytes).
 please note that I set EXTINF titles to the verse number (and used 0 for the intro).  this could/should be used during verse selection
 (instead of assuming each segment is a verse, look at the title explicitly, this seems safer)

 idea for goal 2 is to generate a playlist like this for each quality, and use a master playlist of all three (the client dynamically decides which to use).

 if proof-of-concept testing shows that both of the goals can be accomplished, idea is:
  A. add audio HLS endpoint to the API (would like to discuss implementation plan before this is performed)
  B. FCBH will generate and load all necessary metadata (eg times and bytes)


reference:
 https://stackoverflow.com/questions/23497782/how-to-create-byte-range-m3u8-playlist-for-hls
 https://tools.ietf.org/html/draft-pantos-http-live-streaming-23#page-22

steps:
1. query database for timestamps, export result to JHN_01.csv
  SELECT bf.book_id, bf.chapter_start, ft.verse_start, ft.timestamp, file_name
   FROM bible_file_timestamps ft
   JOIN bible_files bf ON bf.id=ft.bible_file_id
   JOIN bible_filesets fs ON fs.hash_id=bf.hash_id
   WHERE fs.id = 'ENGESVN2DA'
     AND book_id='JHN'
     AND chapter_start=1;

2. save mp3 frame info into a file
  ffprobe -show_frames -select_streams a -of compact -show_entries frame=pkt_pos,best_effort_timestamp_time,pkt_duration_time B04___01_John________ENGESVN2DA.mp3 >pos

3. create a playlist
  ./mkstream.pl > JHN_01.m3u8


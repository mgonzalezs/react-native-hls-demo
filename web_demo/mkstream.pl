#!/usr/bin/perl
#
# ./mkstream.pl

open V, "JHN_01.csv";
open B, "pos";


$lv=0;
while (<V>) {
	next unless /mp3/;
	chomp;
	($bk,$ch,$v,$t,$f)=split /,/, $_;
	&nextverse();
}
	# set t unreasonably large, to find last 
	# this omits final frame, will be more careful with actual code, this is testing quality only
	$t=99999999999999999999999999999999999;
	&nextverse();
	push @m3u8, sprintf "#EXTINF:%f,%d\n#EXT-X-BYTERANGE:%d@%d\n$f\n", $time - $lt + $dur, $lv, $byte - $lb, $lb;

printf "#EXTM3U\n#EXT-X-TARGETDURATION:%f\n#EXT-X-MEDIA-SEQUENCE:0\n#EXT-X-VERSION:4\n", $totdur;
print @m3u8;




sub nextverse {
	while (<B>) {
		($time,$dur,$byte)=$_=~/time=([0-9.]+)\|pkt_duration_time=([0-9.]+)\|pkt_pos=(\d+)/;
		$totdur += $dur;
		if (! $lb) { # first one
			$lt = $time;
			$lb = $byte;
		}
		if ($time >= $t) {
			push @m3u8, sprintf "#EXTINF:%f,%d\n#EXT-X-BYTERANGE:%d@%d\n$f\n", $time - $lt, $lv, $byte - $lb, $lb;
			$lt = $time;
			$lb = $byte;
			$lv = $v;
			last;
		}
	}
}

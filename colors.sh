#!/bin/sh

function write_bold()
{
  [ $1 = "1" ]     && echo -ne '\033[1m';
  [ $1 = "on" ]    && echo -ne '\033[1m';
  [ $1 = "true" ]  && echo -ne '\033[1m';
  [ $1 = "0" ]     && echo -ne '\033[0m';
  [ $1 = "off" ]   && echo -ne '\033[0m';
  [ $1 = "false" ] && echo -ne '\033[0m';
}

function write_color()
{
  [ $1 = "black" ]   && echo -ne '\033[30m';
  [ $1 = "red" ]     && echo -ne '\033[31m';
  [ $1 = "green" ]   && echo -ne '\033[32m';
  [ $1 = "yellow" ]  && echo -ne '\033[33m';
  [ $1 = "blue" ]    && echo -ne '\033[34m';
  [ $1 = "magenta" ] && echo -ne '\033[35m';
  [ $1 = "cyan" ]    && echo -ne '\033[36m';
  [ $1 = "grey" ]    && echo -ne '\033[37m';
  [ $1 = "white" ]   && echo -ne '\033[38m';
}

function write_background()
{
  [ $1 = "black" ]   && echo -ne '\033[40m';
  [ $1 = "red" ]     && echo -ne '\033[41m';
  [ $1 = "green" ]   && echo -ne '\033[42m';
  [ $1 = "yellow" ]  && echo -ne '\033[43m';
  [ $1 = "blue" ]    && echo -ne '\033[44m';
  [ $1 = "magenta" ] && echo -ne '\033[45m';
  [ $1 = "cyan" ]    && echo -ne '\033[46m';
  [ $1 = "grey" ]    && echo -ne '\033[47m';
  [ $1 = "white" ]   && echo -ne '\033[48m';
}


function write()
{
  echo -n "$1";
}

function writeln()
{
  echo "$1"
}

function echo_h1()
{
	local h_len
	local pretxt
	local postxt
	local reserv
	local COLUMNS
	
	COLUMNS="50"
	reserv="10"
	pretxt=""
	postxt=""
	
	h_len=`echo -n "$1" | wc -m`
	if expr $h_len '<' '(' $COLUMNS '-' $reserv ')'; then		
		pretxt=`expr '(' $COLUMNS '-' $reserv ')' '/' 2 - $h_len / 2`
		postxt=`expr '(' $COLUMNS '-' $reserv ')' '/' 2 - $h_len / 2`
		
		echo "length: $h_len"
		echo "pre length: $pretxt"

		if expr '(' "$h_len" '%' '2' ')' '>' '0'; then
		    postxt=`expr $postxt '-' 1`
		fi
		
		local txt

		txt=""		
		while [ $pretxt -gt 0 ]
		do
			txt="=$txt"
			pretxt=`expr $pretxt '-' 1`
		done		
		pretxt="$txt"

		txt=""		
		while [ $postxt -gt 0 ];
		do
			txt="=$txt"
			postxt=`expr $postxt '-' 1`
		done		
		postxt="$txt"
	fi > /dev/null

	write_bold on
	write_color black
	write "$pretxt"
	write "==== "
	write_color red
	write "$1"
	write_color black
	write " ===="
	writeln "$postxt"
	write_bold off
}


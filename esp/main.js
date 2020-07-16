//Copyright (C) 2015 <>< Charles Lohr, see LICENSE file for more info.
//
//This particular file may be licensed under the MIT/x11, New BSD or ColorChord Licenses.
//https://github.com/hak5darren/USB-Rubber-Ducky/wiki/Duckyscript

var txtArrayDuckScript;
var prev_command;

var ducky_keyboard_modifiers = {
    "CTRL": 1,
    "CONTROL": 1,
    "SHIFT": 2,  
    "ALT": 4, 
    "GUI": 8,
    "WINDOWS": 8
}

var ducky_keys = {
    "BREAK": 0x48,
    "PAUSE": 0x48,  
    "CAPSLOCK": 0x39, 
    "DELETE": 0x4c,
    "END": 0x4d, 
    "ESC": 0x29, 
    "ESCAPE": 0x29, 
    "HOME": 0x4a, 
    "INSERT": 0x49, 
    "PAGEUP": 0x4b, 
    "PAGEDOWN": 0x4e, 
    "WINDOWS": 0x3E, //?
    "GUI": 0x3E,  //?
    "UPARROW": 0x52,
    "UP": 0x52,
    "DOWNARROW": 0x51,
    "DOWN": 0x51,  
    "LEFTARROW": 0x50,
    "LEFT": 0x50, 
    "RIGHTARROW": 0x4f,
    "RIGHT": 0x4f, 
    "TAB": 0x2b,
    "PRINTSCREEN": 0x46,
    "SPACE": 0x2c, 
    "SCROLLLOCK": 0x47,
    "BACKSPACE": 0x2a,
    "NUMLOCK": 0x53
}

var ducky_keys_shift = {
    "DELETE": 0x4c, 
    "HOME": 0x4a, 
    "INSERT": 0x49, 
    "PAGEUP": 0x4b, 
    "PAGEDOWN": 0x4e, 
    "WINDOWS": 0x29, //?
    "GUI": 0x29,  //?
    "UPARROW": 0x52, 
    "DOWNARROW": 0x51, 
    "LEFTARROW": 0x50, 
    "RIGHTARROW": 0x4f, 
    "TAB": 0x2b
}



var ducky_keys_shift = {
    "DELETE": 0x4c, 
    "HOME": 0x4a, 
    "INSERT": 0x49, 
    "PAGEUP": 0x4b, 
    "PAGEDOWN": 0x4e, 
    "WINDOWS": 0x29, //?
    "GUI": 0x29,  //?
    "UPARROW": 0x52, 
    "DOWNARROW": 0x51, 
    "LEFTARROW": 0x50, 
    "RIGHTARROW": 0x4f, 
    "TAB": 0x2b
}

var ducky_keys_alt = {
    "END": 0x4d, 
    "ESC": 0x29, 
    "ESCAPE": 0x29, 
    "F1": 0x3a,
    "F2": 0x3b,
    "F3": 0x3c,
    "F4": 0x3d,
    "F5": 0x3e,
    "F6": 0x3f,
    "F7": 0x40,
    "F8": 0x41,
    "F9": 0x42,
    "F10": 0x43,
    "F11": 0x44,
    "F12": 0x45,  
    "SPACE": 0x2c, 
    "TAB": 0x2b
}

var ducky_keys_ctrl = {
    "BREAK": 0x48, 
    "ESC": 0x29, 
    "ESCAPE": 0x29, 
    "F1": 0x3a,
    "F2": 0x3b,
    "F3": 0x3c,
    "F4": 0x3d,
    "F5": 0x3e,
    "F6": 0x3f,
    "F7": 0x40,
    "F8": 0x41,
    "F9": 0x42,
    "F10": 0x43,
    "F11": 0x44,
    "F12": 0x45,  
    "PAUSE": 0x48
}

function duckyKeyboardModifiers(command){
  var arryCommand = command.split("-");
  var keyboard_modifier = 0; 
  for(var i =0 ; i < arryCommand.length;i++){   
    if( typeof ducky_keyboard_modifiers[arryCommand[i]] != 'undefined' ) {
        keyboard_modifier += ducky_keyboard_modifiers[arryCommand[i]];
    }
   
  }
  console.log('>>KeyboardModifiers: '+keyboard_modifier);
  KeyboardModifiers = keyboard_modifier;
  return arryCommand[0];
}

function duckySHIFT(param){
    if( typeof ducky_keys_shift[param] == 'undefined' ) {
        alert('parametro incorreto');
    }else{
       // KeyboardModifiers = 2;
        SpecKey(null, ducky_keys_shift[param]);
        KeyboardModifiers = 0;
    }
}

function duckyALT(param){
    if( typeof ducky_keys_alt[param] == 'undefined' ) {
        if( param.length == 1 ){
      //      KeyboardModifiers = 4;
            KeypressMulti(param);
            KeyboardModifiers = 0;
        }else{
            alert('parametro incorreto');
        }
    }else{
      //  KeyboardModifiers = 4;
        SpecKey(null, ducky_keys_alt[param]);
        KeyboardModifiers = 0;
    }
}

function duckyCTRL(param){
    if( typeof ducky_keys_ctrl[param] == 'undefined' ) {
        if( param.length == 1 ){
        //    KeyboardModifiers = 1;
            KeypressMulti(param);
            KeyboardModifiers = 0;
        }else{
            alert('parametro incorreto');
        }
    }else{
      //  KeyboardModifiers = 1;
        SpecKey(null, ducky_keys_ctrl[param]);
        KeyboardModifiers = 0;
    }
}

function duckyGUI(param){
 //   KeyboardModifiers = 8;
    KeypressMulti(param);
    KeyboardModifiers = 0;
}

function duckyMENU(){ // SHIFT + F10
 //   KeyboardModifiers = 2;
    SpecKey(null, 67 )
    KeyboardModifiers = 0;
}

function duckyScript(value){
    var res = value.split(" ");
    if ( res.length > 0 ){
        var command = res.shift();
        var param = res.join(" ");
        
        console.log('Command: '+command);
        command = duckyKeyboardModifiers(command);
        switch(command) {
           case "STRING":
           KeypressMulti(param);
           console.log('>> STRING ['+param+']');
           break;
         case "GUI":
           duckyGUI(param);
           break;
         case "WINDOWS":
            duckyGUI(param);
           break;
         case "ENTER":
            Keypress(40, 1, false);
            Keypress(40, 0, false);
           // code block
           break;
         case "REM":
           console.log("> REM: "+param)
           break;
         case "MENU":
           duckyMENU();
           break;
         case "APP":
           duckyMENU();
           break;
         case "SHIFT":
            duckySHIFT(param);           
           break;
         case "ALT":
           duckyALT(param);
           break;
         case "CONTROL":            
           duckyCTRL(param);
           break;
         case "CTRL":
           duckyCTRL(param);
           break;
         case "REPEAT":
            for (var i = 0; i < param; i++){
                duckyScript(prev_command);
            }
           break;
         default:
            if( typeof ducky_keys[command] == 'undefined' ) {
                alert('Nenhum comando reconhecido');
            }else{
                Keypress(ducky_keys[command], 1, false);
                Keypress(ducky_keys[command], 0, false);
            }
            //console.log('Nenhum comando reconhecido!');
        }

    }
}

function duckyExploit(c){

    if( c == -1){
        txtArrayDuckScript=top[0].document.getElementById("__component0---app--textArea_01-inner").value.split('\n');
      /*  //txtArrayDuckScript=document.getElementById('text_ducky').value.split('\n'); */
            c=0;   
    }
    if( c<txtArrayDuckScript.length ){
        value = txtArrayDuckScript[c++];
        var res = value.split(" ");
        if ( res.length > 0 ){
            var command = res[0];
            var param = res[1];
            if( command == 'DELAY'){
                setTimeout('duckyExploit('+c+')',param);
            }else{
                duckyScript(value);
                prev_command = value;
                duckyExploit(c)
            }
        }

    }
    //for(var i=0;i<txtArrayDuckScript.length;i++){
    //    duckyScript(txtArrayDuckScript[i]);
    //}

}

//

//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\\



function KickHID()
{
}

var lastMouseX;
var lastMouseY;
var TimeLastUp, TimeLastDown;
var ButtonsDown = 0;

var UpTimeout;


function HandleUpDown( button, down )
{
	var Mask = 1<<button;
	if( down )
		ButtonsDown |= Mask;
	else
		ButtonsDown &= ~Mask;

	DeltaMouse( 0, 0 );

	if( down )
	{
		$("#MouseCap").css("background-color","blue");
	}
	else
	{
		$("#MouseCap").css("background-color","green");
	}

}

function MouseUpDown( down )
{
	if( !down )
	{
		TimeLastUp = Date.now();
	    var dt = TimeLastUp - TimeLastDown;
		if( dt < 100 ) HandleUpDown( 0, true );
		UpTimeout = setTimeout( function() { HandleUpDown( 0, false ); }, 220 );
	}
	else
	{
		TimeLastDown = Date.now();
	    var dt = TimeLastDown - TimeLastUp;
		HandleUpDown( 0, dt < 130 );
		try{ clearTimeout( UpTimeout ); } catch(e) { }
	}
}

function DeltaMouse( x, y )
{
	msg = Math.round(x) + ", " + Math.round(y);
	var msg = "CM" + ButtonsDown + "\t" + Math.round(x) + "\t" + Math.round(y);
	QueueOperation( msg );	
	//console.log( msg );
}


var de_usblookup = {
	0x08 : 0x2A, // BACKSPACE
	0x09 : 0x2B, // TAB
	0x0D : 0x28, // ENTER
	0x0C : 0x28, // also [enter]  (may not be needed)
	0x10 : 0xE1, // SHIFT
	0x11 : 0xE0, // CTRL
	0x12 : 0xE2, // ALT
	0x14 : 0x39, // CAPS
	0x1B : 0x29, // USAGE_MAXIMUM (Keyboard Right GUI)
	0x20 : 0x2C, // whiteSpace (' ')
	//0xAD : 0x7F, // MUTE
	
	0x41 : 0x04, // a
	0x42 : 0x05, // b 
	0x43 : 0x06, // c
	0x44 : 0x07, // d
	0x45 : 0x08, // e
	0x46 : 0x09, // f
	0x47 : 0x0A, // g
	0x48 : 0x0B, // h
	0x49 : 0x0C, // i
	0x4A : 0x0D, // j
	0x4B : 0x0E, // k
	0x4C : 0x0F, // l
	0x4D : 0x10, // m
	0x4E : 0x11, // n
	0x4F : 0x12, // o
	0x50 : 0x13, // p
	0x51 : 0x14, // q
	0x52 : 0x15, // r
	0x53 : 0x16, // s
	0x54 : 0x17, // t
	0x55 : 0x18, // u
	0x56 : 0x19, // v
	0x57 : 0x1A, // w
	0x58 : 0x1B, // x		
	0x59 : 0x1d, // y
	0x5a : 0x1c, // z
	
	0xc0 : 0x33, // Ã¶
	0xde : 0x34, // Ã¤
	0xba : 0x2f, // Ã¼
	
	0x30 : 0x27, // 0
    0x31 : 0x1e, // 1
	0x32 : 0x1f, // 2
	0x33 : 0x20, // 3
	0x34 : 0x21, // 4
	0x35 : 0x22, // 5
	0x36 : 0x23, // 6
	0x37 : 0x24, // 7
	0x38 : 0x25, // 8
	0x39 : 0x26, // 9

	0xdb : 0x2d, // Ã
	0xdd : 0x2e, // Â´
	0xe2 : 0x64, // <>|
	0xbe : 0x37, // .:
	0xbc : 0x36, // ,;
	0xbd : 0x38, // -_
	0xbb : 0x30, // +*~
	0xdc : 0x35, // ^
	0xbf : 0x31, // #
	
	//Numpad (on)
	0x60 : 0x27, // 0
    0x61 : 0x1e, // 1
	0x62 : 0x1f, // 2
	0x63 : 0x20, // 3
	0x64 : 0x21, // 4
	0x65 : 0x22, // 5
	0x66 : 0x23, // 6
	0x67 : 0x24, // 7
	0x68 : 0x25, // 8
	0x69 : 0x26, // 9
	
	0x6f : 0xDC, // /
	0x6a : 0xDD, // *
    0x6d : 0xDE, // -
	0x6b : 0xDF, // +

	//Numpad (on)

    0x1e : 0x59, // Keypad 1 and END
    0x1f : 0x5A, // Keypad 2 and Down Arrow
	0x20 : 0x5B, // Keypad 3 and PageDn
	0x21 : 0x5C, // Keypad 4 and Left Arrow
	0x22 : 0x5D, // Keypad 5
	0x23 : 0x5E, // Keypad 6 and Right Arrow
	0x24 : 0x5F, // Keypad 7 and Home
	0x25 : 0x60, // Keypad 8 and Up Arrow
	0x26 : 0x61, // Keypad 9 and PageUp 
	0x60 : 0x62, // Keypad 0 and Insert
		
	//Arrows
	0x28 : 0x4E, // DownArrow
	0x27 : 0x4F, // RightArrow
    0x25 : 0x50, // LeftArrow
	0x26 : 0x52, // UpArrow
}

//var allUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+{}|:\"~<>?¨'";
var allUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+{}|:\"<>?¨"; //BR
var en_usblookup = {
	0x08 : 0x2A, // BACKSPACE
	0x09 : 0x2B, // TAB
	0x0C : 0x28, // also [enter]  (may not be needed)
	0x0D : 0x28, // ENTER
	0x10 : 0xE1, // SHIFT
	0x11 : 0xE0, // CTRL
	0x12 : 0xE2, // ALT
	0x14 : 0x39, // CAPS
	0x1B : 0x29,
	0x20 : 0x2C,
	0xAD : 0x7F, // MUTE
}


var br_usblookup = {
	0x08 : 0x2A, // BACKSPACE
	0x09 : 0x2B, // TAB
	0x0C : 0x28, // also [enter]  (may not be needed)
	0x0D : 0x28, // ENTER
	0x10 : 0xE1, // SHIFT
	0x11 : 0xE0, // CTRL
	0x12 : 0xE2, // ALT
	0x14 : 0x39, // CAPS
	0x1B : 0x29,
	0x20 : 0x2C,
	0xAD : 0x7F, // MUTE
    "231": 0x33, // ç
    "92" : 0x64, // \
    0x5e : 0x34, // ^
   "126" : 0x34, // ~
    0x5f : 0x2d,  // _
    0x2d : 0x2d,  // _
    0x2b : 0x2e,  // +
    0x3d : 0x2e,  // =
    0x27 : 0x2f,  // '
    0x60 : 0x2f,  // `
    0x5b : 0x30,  // [
    0x7b : 0x30,  // {
    0x7d : 0x32,  // }
    0x5d : 0x32,  // ]
    0x22 : 0x35,  // "
    0x27 : 0x35,  // '
    0x3C : 0x36,  // <
    0x2C : 0x36,  // ,
    0x3e : 0x37,  // >
    0x2e : 0x37,  // .
    0x3A : 0x38,  // :
    0x3B : 0x38,  // ; 
    0x3F : 0x87,  // ?
    0x2f : 0x87,  // /

}

//"231": 0x3b  // ç


var s1 = "abcdefghijklmnopqrstuvwxyz1234567890";
var s2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()";
for (var c = 0; c < 36; c++) {
	en_usblookup[s1[c].charCodeAt(0)] = c + 4;
	en_usblookup[s2[c].charCodeAt(0)] = c + 4;
}

var s2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%¨&*()";
for (var c = 0; c < 36; c++) {
	br_usblookup[s1[c].charCodeAt(0)] = c + 4;
	br_usblookup[s2[c].charCodeAt(0)] = c + 4;
}


var s1 = "-=[]\\ ;'`,./";
var s2 = "_+{}| :\"~<>?";
for (var c = 0; c < 12; c++) {
	if (c == 5) continue; // Skip over american-only hash-tilde, since that will mess with the non-american 3-hash and grave-tilde keys.
	en_usblookup[s1[c].charCodeAt(0)] = c + 0x2D;
	en_usblookup[s2[c].charCodeAt(0)] = c + 0x2D;
}
//TODO: This would mask regular ASCII
//for (var c = 0; c < 12; c++) { // F1 .. F12
//    en_usblookup[c + 0x70] = c + 0x3A;
//}
//for (var c = 0; c < 12; c++) { // F13 .. F24
//    en_usblookup[c + /* TODO: Figure out keycode for F13 */] = c + 0x68;
//}
// TODO: Numpad


function changeKeyboardLayout()
{
	e = document.getElementById("keyboardLayoutSelect");
	keyboardLayout = e.options[e.selectedIndex].value;
}

keyboardLayout = "en";

function UsbLookup(jskeycode)
{
console.log(">> UsbLookup ID (HID): " + jskeycode + " (" + br_usblookup[jskeycode].toString(16) +  ")")
	switch(keyboardLayout) {
    case "de":
        return de_usblookup[jskeycode];
    case "en":
		return en_usblookup[jskeycode];
    case "br":
		return br_usblookup[jskeycode];	
	}	
}

var KeyboardModifiers = 0;

function KeyModifiers()
{
	var mod = 0;
	for( var i = 0; i < 4; i++ )
	{
		if( $("#mod"+i).is(":checked") ) mod |= 1<<i;
	}
	KeyboardModifiers = mod;
    console.log("CK" + KeyboardModifiers + "\t0 | "+mod)
    keyops.push("CK" + KeyboardModifiers + "\t0");
}

function SpecKey( k, code )
{
	console.log( "::::" + code );
    keyops.push("CK" + KeyboardModifiers + "\t" + code );
    keyops.push("CK" + KeyboardModifiers + "\t0");
}

$(document).ready(function () {
    // Delay adding events, until the document is fully loaded
    $("#kbd").click(function () {$("#kin").focus(); });
    $("#kin").on("keydown keyup", function (ev) {
        var type = ev.type == "keydown" ? 1 : 0;
        var c = ev.originalEvent.keyCode;
		console.log("148 Keypress Code (JS): " + c + " (" + c.toString(16) +  ")")
        if (c == 229) { // Android keyboard "Unidentified" (for Swipe, etc.)
            if (type == 1) return; // Only check the text box on KeyUp events
            KeypressMulti(this.value);
            this.value = "";
            return;
        }
        var usbId = UsbLookup(c);
        //console.log(ev);
        if (usbId === undefined) return; // Not a valid HID key code
        ev.preventDefault(); // Stop things like TAB switching fields
        this.value = "";
        console.log(">>>>> "+usbId + " " +  type + " " + ev.shiftKey );
        Keypress(usbId, type, ev.shiftKey);
    });

	for( var i = 0; i < 4; i++ )
	{
		$("#mod"+i).change(KeyModifiers);
	}

	var codes = [ 41, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 72, 76, 43, 75, 78, 74, 77, 40, 128, 129, 79, 80, 81, 82 ];
	for( var i = 0; i < codes.length; i++ )
	{
		let code = codes[i];
		$("#specialpress"+i).click( function(k) { SpecKey(k, code ); } );
	}
});

var keyops = [];
function KeyInterval()
{
	if( keyops.length )
	{
		QueueOperation( keyops[0] );
		keyops.shift();
	}
}
setInterval( KeyInterval, 75 );

function Keypress(id, type, shift) {
	console.log("188 Keypress ID (HID): " + id + " (" + id.toString(16) +  ")")
	var mods = KeyboardModifiers;
    if (shift) {
        mods |= 2;
    } else {
        mods &=~2;
    }
    
    if (type == 1) keyops.push("CK" + mods + "\t" + id); // Need a sanity check;
    if (type == 0) keyops.push("CK" + KeyboardModifiers + "\t0");
}
function KeypressMulti(str) {
    [].forEach.call(str, function(char) {
        //console.log(char);
        var modifier = KeyboardModifiers;
        if (allUpper.indexOf(char) >= 0) modifier |= 2;
        let id = UsbLookup(char.charCodeAt(0));
        if (id === undefined) return;
        $("#typed").text(($("#typed").text() + char).slice(-50));
        $("#codes").text(($("#codes").text() + " " + ("0"+id.toString(16)).slice(-2)).slice(-50))
        keyops.push("CK" + modifier + "\t" + id);
	    keyops.push("CK" + KeyboardModifiers + "\t0");
    });
}

function AttachMouseListener()
{
    $("#MouseCap").on("touchstart", function(event) {
		event.preventDefault();
		var e = event.originalEvent.changedTouches[0];
		lastMouseX = e.clientX;
		lastMouseY = e.clientY;
		MouseUpDown( true );
	});

    $("#MouseCap").on("touchend", function(event) {
		event.preventDefault();
		var e = event.originalEvent.changedTouches[0];
		lastMouseX = e.clientX;
		lastMouseY = e.clientY;
		MouseUpDown( false );
	});

	$("#MouseCap").on("touchmove", function(event)  {
		event.preventDefault();
		var e = event.originalEvent.changedTouches[0];
		DeltaMouse( e.clientX - lastMouseX, e.clientY - lastMouseY );
		lastMouseX = e.clientX;
		lastMouseY = e.clientY;
		return false;
	});

	//This is for desktop mice.
	for( var b = 0; b < 3; b++ )
	{
		let ths = b; //Thank you, Mortiz from youtube live chat!!!
		$("#Mouse"+b).on("mouseup", function(event) { HandleUpDown( ths, 0 ); } );
		$("#Mouse"+b).on("mousedown", function(event) { HandleUpDown( ths, 1 ); } );
		$("#Mouse"+b).on("touchend", function(event) { HandleUpDown( ths, 0 ); } );
		$("#Mouse"+b).on("touchstart", function(event) { HandleUpDown( ths, 1 ); } );
	}

	console.log( "Attaching." );
}

window.addEventListener("load", AttachMouseListener, false);



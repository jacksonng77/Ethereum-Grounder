//Reference: https://github.com/JimmySoftware/ESPert/blob/master/examples/_1020_PIR/_1020_PIR.ino

#include <ESPert.h>

ESPert espert;

const char *host = "35.209.171.26";
const int httpPort = 80;
String path = "/move?contractaddress=0x86C9D3aBF13D25CED87C0D00331667AC44c04a89";


// the time when the sensor outputs a low impulse
long unsigned int lowIn;

// the amount of milliseconds the sensor has to be low
// before we assume all motion has stopped
long unsigned int pause = 5000;

boolean lockLow = true;
boolean takeLowTime;

int pirPin = 13; // the digital pin connected to the PIR sensor's output

//#define ESPERT_BOARD_ESPRESSO_LITE2

int ledPin = LED_BUILTIN;

void setup() {

  pinMode(pirPin, INPUT);
  pinMode(ledPin, OUTPUT);
  digitalWrite(pirPin, LOW);
  
  espert.init();

  espert.oled.init();
  delay(2000);

  espert.oled.clear();
  espert.oled.println(espert.info.getId());
  espert.oled.println();

  int mode = espert.wifi.init();

  if (mode == ESPERT_WIFI_MODE_CONNECT) {
    espert.println(">>> WiFi mode: connected.");
    espert.oled.println("WiFi: connected.");
    espert.oled.print("IP..: ");
    espert.oled.println(espert.wifi.getLocalIP());
  } else if (mode == ESPERT_WIFI_MODE_DISCONNECT) {
    espert.println(">>> WiFi mode: disconnected.");
    espert.oled.println("WiFi: not connected.");
  } else if (mode == ESPERT_WIFI_MODE_SMARTCONFIG) {
    espert.println(">>> WiFi mode: smart config.");
  } else if (mode == ESPERT_WIFI_MODE_SETTINGAP) {
    espert.println(">>> WiFi mode: access point.");
  }
}

void loop() {

 if (digitalRead(pirPin) == HIGH) {
    digitalWrite(ledPin, HIGH); // the led visualizes the sensors output pin state
    if (lockLow) {
      // makes sure we wait for a transition to LOW before any further output is made:
      lockLow = false;
      Serial.println("---");
      Serial.print("motion detected at ");
      Serial.print(millis() / 1000);
      Serial.println(" sec");
      espert.println(">>" + espert.wifi.getHTTP(host, path.c_str()) + "<<"); //send movement to server
      delay(50);
    }
    takeLowTime = true;
  }

  if (digitalRead(pirPin) == LOW) {
    digitalWrite(ledPin, LOW); // the led visualizes the sensors output pin state

    if (takeLowTime) {
      lowIn = millis();    // save the time of the transition from high to LOW
      takeLowTime = false; // make sure this is only done at the start of a LOW phase
    }

    // if the sensor is low for more than the given pause,
    // we assume that no more motion is going to happen
    if (!lockLow && millis() - lowIn > pause) {
      // makes sure this block of code is only executed again after
      // a new motion sequence has been detected
      lockLow = true;
      Serial.print("motion ended at "); // output
      Serial.print((millis() - pause) / 1000);
      Serial.println(" sec");
      delay(50);
    }
  }
}


      
      let SerialPort;
      let worker;
      let isConnect = false;
      const enc = new TextEncoder();
      var target_id;

      async function onChangespeech() {
        if (!isConnect) {
          alert("Please Connect USB !!");
          return;
        }
       
        try {
          const commandlist = outText;
          const commandSplit = commandlist.split(" ")
          const command = commandSplit.slice(-1);
          const computerText = `${command}@`;
          await worker.write(enc.encode(computerText));
        } catch (e) {
          console.log(e);
        }
      }
    
    async function onConnectUsb() {
      try {
        const requestOptions = {
          // Filter on devices with the Arduino USB vendor ID.
          filters: [{ usbVendorId: 0x2341 }],
        };

        // Request an Arduino from the user.
        SerialPort = await navigator.serial.requestPort(requestOptions);
        await SerialPort.open({ baudRate: 115200 });
        worker = SerialPort.writable.getWriter();
        isConnect = true;
      } catch (e) {
        console.log("err", e);
      }
    }

    
  
function Box1 () {
    Forward(Speed, 300)
    Track_Time(Acc_Speed, 800)
    Track_JC(Speed, Track_JC_ms)
    Turn_Right()
    Reverse_Balance()
    Track_Time(Acc_Speed, 920)
    Track_JC(Speed, Track_JC_ms)
    Turn_Right()
    Reverse_Balance()
    Track_Time(Acc_Speed, 490)
    Track_JC(Speed, Track_JC_ms)
    Turn_Right()
    Reverse_Balance()
    Track_Time(Acc_Speed, 490)
    Track_JC(Speed, Track_JC_ms)
    Turn_Left()
    Reverse_Balance()
    Track_Time(Acc_Speed, 800)
    Track_JC(Speed, Track_JC_ms)
    Servo_Kick()
}
function Backward_45_cm () {
    Backward(Slow_Speed, Backward_45_ms)
    Motor_Stop()
}
function Turn_Right () {
    Motor_Stop()
    MyRobotBit.Rotate(Turn.Right, Turn_Speed, Turn_Right_ms)
    Motor_Stop()
}
function Follow_30_cm () {
    Track_Time(Speed, Follow_30_ms)
    Motor_Stop()
}
function Average_Ref () {
    Ref_L3 = 616
    Ref_L2 = 564
    Ref_L1 = 239
    Ref_R1 = 275
    Ref_R2 = 514
    Ref_R3 = 650
}
function Forward (Motor_Speed: number, Time: number) {
    Tune_Motor(Motor_Speed)
    MyRobotBit.MotorAB(motorDIR.Forward, Left_Speed, Right_Speed)
    basic.pause(Time)
}
function Tune_Motor (Motor_Speed: number) {
    Error = 0
    Integral = 0
    Pre_Error = 0
    Kp = 30
    Kd = 35
    Ki = 0
    Max_Speed = Motor_Speed
    if (Motor_Speed <= 70) {
        Left_Speed = Motor_Speed + Tune_Lrft_70_ms
        Right_Speed = Motor_Speed - Tune_Right_70_ms
    } else {
        Left_Speed = Motor_Speed + Tune_Lrft_100_ms
        Right_Speed = Motor_Speed - Tune_Right_100_ms
    }
}
function Check_Point_2 () {
    Track_JC(Speed, Track_JC_ms)
    Turn_Left()
    Follow_30_cm()
    Turn_Left()
    Reverse_Balance()
    Track_Time(Acc_Speed, 960)
    Track_JC(Speed, Track_JC_ms)
    Turn_Right()
    Track_Time(Acc_Speed, 240)
    Track_JC(Speed, Track_JC_ms)
    Turn_Left()
    Reverse_Balance()
    Track_Time(Acc_Speed, 800)
    Track_JC(Speed, Track_JC_ms)
    UTurn()
    Reverse_Balance()
}
function Reverse_Balance () {
    Backward(Slow_Speed, 1)
    Status = 0
    while (Status == 0) {
        Read_2_Digital()
        if (BL == 0 && BR == 0) {
            Status = 1
        } else if (BL == 0 && BR == 1) {
            MyRobotBit.motorOFF(motorSEL.M12, StopMode.Brake)
            MyRobotBit.MotorON(motorSEL.M2, motorDIR.Reverse, Slow_Speed)
            while (BR == 1) {
                Read_2_Digital()
            }
            Status = 2
        } else if (BL == 1 && BR == 0) {
            MyRobotBit.motorOFF(motorSEL.M12, StopMode.Brake)
            MyRobotBit.MotorON(motorSEL.M1, motorDIR.Reverse, Slow_Speed)
            while (BL == 1) {
                Read_2_Digital()
            }
            Status = 3
        }
    }
    Motor_Stop()
}
function Track_JC (Motor_Speed: number, Time: number) {
    Forward(Motor_Speed, 1)
    Cal_Error()
    while (Error < 100) {
        Track_PID()
        Cal_Error()
    }
    Balance()
    Backward(Motor_Speed, Time)
}
function Go_to_win () {
    Track_Time(Acc_Speed, 960)
    Track_JC(Speed, Track_JC_ms)
    Turn_Right()
    Reverse_Balance()
    Follow_75_cm()
    Turn_Right()
    Reverse_Balance()
    Track_Time(Acc_Speed, 1900)
    Track_JC(Speed, Track_JC_ms)
    Turn_Right()
    Track_Time(Acc_Speed, 490)
    Track_JC(Speed, Track_JC_ms)
    Turn_Right()
    Reverse_Balance()
    Track_Time(Acc_Speed, 490)
    Track_JC(Speed, Track_JC_ms)
    Turn_Left()
    Reverse_Balance()
    Track_Time(Acc_Speed, 490)
    Track_JC(Speed, Track_JC_ms)
    Turn_Left()
    Reverse_Balance()
    Track_Time(Acc_Speed, 960)
    Track_JC(Speed, Track_JC_ms)
    Turn_Left()
    Reverse_Balance()
    Track_Time(Acc_Speed, 900)
    Track_JC(Speed, Track_JC_ms)
    Winner()
}
input.onButtonPressed(Button.A, function () {
    for (let index = 0; index < 4; index++) {
        OLED.init(128, 64)
        OLED.clear()
        Read_6_Analog()
        OLED.writeString("L3 = ")
        OLED.writeNum(MySensor.analogRead(MySensor.analogPort.P0))
        OLED.newLine()
        OLED.writeString("L2 = ")
        OLED.writeNum(MySensor.analogRead(MySensor.analogPort.P1))
        OLED.newLine()
        OLED.writeString("L1 = ")
        OLED.writeNum(MySensor.analogRead(MySensor.analogPort.P2))
        OLED.newLine()
        OLED.writeString("R1 = ")
        OLED.writeNum(MySensor.analogRead(MySensor.analogPort.P3))
        OLED.newLine()
        OLED.writeString("R2 = ")
        OLED.writeNum(MySensor.analogRead(MySensor.analogPort.P4))
        OLED.newLine()
        OLED.writeString("R3 = ")
        OLED.writeNum(MySensor.analogRead(MySensor.analogPort.P10))
        OLED.newLine()
        Read_2_Digital()
        OLED.writeString("BL = ")
        OLED.writeNum(MySensor.digitalRead(MySensor.digitalPort.P6))
        OLED.newLine()
        OLED.writeString("BR = ")
        OLED.writeNum(MySensor.digitalRead(MySensor.digitalPort.P7))
        basic.pause(500)
    }
})
function UTurn () {
    Motor_Stop()
    MyRobotBit.Rotate(Turn.Right, Turn_Speed, Uturn_ms)
    Motor_Stop()
}
function Convert_6_Analog () {
    Read_6_Analog()
    if (L3 < Ref_L3) {
        L3 = 0
    } else {
        L3 = 1
    }
    if (L2 < Ref_L2) {
        L2 = 0
    } else {
        L2 = 1
    }
    if (L1 < Ref_L1) {
        L1 = 0
    } else {
        L1 = 1
    }
    if (R1 < Ref_R1) {
        R1 = 0
    } else {
        R1 = 1
    }
    if (R2 < Ref_R2) {
        R2 = 0
    } else {
        R2 = 1
    }
    if (R3 < Ref_R3) {
        R3 = 0
    } else {
        R3 = 1
    }
}
function Backward_30_cm () {
    Backward(Slow_Speed, Backward_30_ms)
    Motor_Stop()
}
function Turn_Left () {
    Motor_Stop()
    MyRobotBit.Rotate(Turn.Left, Turn_Speed, Turn_Left_ms)
    Motor_Stop()
}
function Follow_45_cm () {
    Track_Time(Speed, Follow_45_ms)
    Motor_Stop()
}
function Balance () {
    if (Error == 101) {
        MyRobotBit.RotateNOTIME(Turn.Left, Slow_Speed)
        while (R1 == 1) {
            Convert_6_Analog()
        }
        basic.pause(10)
    } else if (Error == 102) {
        MyRobotBit.RotateNOTIME(Turn.Right, Slow_Speed)
        while (L1 == 1) {
            Convert_6_Analog()
        }
        basic.pause(10)
    }
    Motor_Stop()
}
function Set_Speed () {
    Speed = 70
    Acc_Speed = 100
    Slow_Speed = 50
    Turn_Speed = 70
}
function Read_6_Analog () {
    L3 = MySensor.analogRead(MySensor.analogPort.P0)
    L2 = MySensor.analogRead(MySensor.analogPort.P1)
    L1 = MySensor.analogRead(MySensor.analogPort.P2)
    R1 = MySensor.analogRead(MySensor.analogPort.P3)
    R2 = MySensor.analogRead(MySensor.analogPort.P4)
    R3 = MySensor.analogRead(MySensor.analogPort.P10)
}
function Raise_the_flag () {
    MyServo.ServoRun(Servo.Servo12, 90)
    basic.pause(8000)
    MyServo.ServoRun(Servo.Servo12, 0)
}
function Track_Time (Motor_Speed: number, Time: number) {
    Forward(Motor_Speed, 1)
    Timer0 = input.runningTime()
    while (input.runningTime() - Timer0 < Time) {
        Cal_Error()
        Track_PID()
    }
}
function Follow_75_cm () {
    Track_Time(Acc_Speed, Follow_75_ms)
    Motor_Stop()
}
function Time_ms () {
    Track_JC_ms = 140
    Tune_Lrft_70_ms = 0
    Tune_Right_70_ms = 4.6
    Tune_Lrft_100_ms = 0
    Tune_Right_100_ms = 11
    Backward_kick_ms = 400
    Backward_30_ms = 700
    Backward_45_ms = 1050
    Follow_30_ms = 450
    Follow_45_ms = 790
    Follow_75_ms = 1020
    Turn_Left_ms = 278
    Turn_Right_ms = 220
    Uturn_ms = 455
}
function Box4 () {
    UTurn()
    Track_JC(Speed, Track_JC_ms)
    Turn_Right()
    Reverse_Balance()
    Track_Time(Acc_Speed, 1200)
    Track_JC(Speed, Track_JC_ms)
    Servo_Kick()
}
function Winner () {
    Forward(Slow_Speed, 500)
    Motor_Stop()
    Raise_the_flag()
    Motor_Stop()
}
function Backward_75_cm () {
    Backward(Slow_Speed, 1)
    Motor_Stop()
}
function Servo_Kick () {
    Motor_Stop()
    MyServo.ServoRun(Servo.Servo11, 41)
    basic.pause(800)
    MyServo.ServoRun(Servo.Servo11, 109)
    Motor_Stop()
}
input.onButtonPressed(Button.B, function () {
    basic.pause(800)
    Box1()
    Box2()
    Box3()
    Box4()
    Check_Point_1()
    Check_Point_2()
    Go_to_win()
})
function Read_2_Digital () {
    BL = MySensor.digitalRead(MySensor.digitalPort.P6)
    BR = MySensor.digitalRead(MySensor.digitalPort.P7)
}
function Box3 () {
    UTurn()
    Track_Time(Acc_Speed, 1100)
    Track_JC(Speed, Track_JC_ms)
    Turn_Left()
    Reverse_Balance()
    Follow_75_cm()
    Turn_Right()
    Reverse_Balance()
    Track_Time(Acc_Speed, 900)
    Track_JC(Speed, Track_JC_ms)
    Turn_Left()
    Track_Time(Acc_Speed, 240)
    Track_JC(Speed, Track_JC_ms)
    Turn_Left()
    Reverse_Balance()
    Track_Time(Acc_Speed, 240)
    Track_JC(Speed, Track_JC_ms)
    Servo_Kick()
}
function Track_PID () {
    Derivative = Error - Pre_Error
    Output = Kp * Error + (Ki * Integral + Kd * Derivative)
    Left_Output = Left_Speed + Output
    Right_Output = Right_Speed - Output
    if (Left_Output > Max_Speed) {
        Left_Output = Max_Speed
    }
    if (Right_Output > Max_Speed) {
        Right_Output = Max_Speed
    }
    if (Left_Output < -1 * Max_Speed) {
        Left_Output = -1 * Max_Speed
    }
    if (Right_Output < -1 * Max_Speed) {
        Right_Output = -1 * Max_Speed
    }
    if (Left_Output >= 0) {
        MyRobotBit.MotorON(motorSEL.M1, motorDIR.Forward, Left_Output)
    } else {
        MyRobotBit.MotorON(motorSEL.M1, motorDIR.Reverse, Left_Output)
    }
    if (Right_Output >= 0) {
        MyRobotBit.MotorON(motorSEL.M2, motorDIR.Forward, Right_Output)
    } else {
        MyRobotBit.MotorON(motorSEL.M2, motorDIR.Reverse, Right_Output)
    }
    Pre_Error = Error
    Integral += Error
}
function Cal_Error () {
    Convert_6_Analog()
    if (L1 == 0 && R1 == 0) {
        Error = 100
    } else if (L1 == 0 && R1 == 1) {
        Error = 101
    } else if (L1 == 1 && R1 == 0) {
        Error = 102
    } else if (R2 == 1 && R3 == 0) {
        Error = -1
    } else if (R2 == 0 && R3 == 0) {
        Error = -2
    } else if (R2 == 0 && R3 == 1) {
        Error = -3
    } else if (L3 == 0 && L2 == 1) {
        Error = 1
    } else if (L3 == 0 && L2 == 0) {
        Error = 2
    } else if (L3 == 1 && L2 == 0) {
        Error = 3
    } else {
        Error = 0
    }
}
function Check_Point_1 () {
    Backward_30_cm()
    Turn_Right()
    Reverse_Balance()
    Track_JC(Speed, Track_JC_ms)
    UTurn()
    Reverse_Balance()
}
function Box2 () {
    Backward_30_cm()
    Turn_Left()
    Reverse_Balance()
    Follow_75_cm()
    Turn_Right()
    Track_JC(Speed, Track_JC_ms)
    Turn_Right()
    Track_JC(Speed, Track_JC_ms)
    Servo_Kick()
}
function Backward (Motor_Speed: number, Time: number) {
    Tune_Motor(Motor_Speed)
    MyRobotBit.MotorAB(motorDIR.Reverse, Left_Speed - 0, Right_Speed - 1)
    basic.pause(Time)
}
function Motor_Stop () {
    MyRobotBit.motorOFF(motorSEL.M12, StopMode.Brake)
    basic.pause(100)
}
let Right_Output = 0
let Left_Output = 0
let Output = 0
let Derivative = 0
let Backward_kick_ms = 0
let Follow_75_ms = 0
let Timer0 = 0
let Follow_45_ms = 0
let Turn_Left_ms = 0
let Backward_30_ms = 0
let R3 = 0
let R2 = 0
let R1 = 0
let L1 = 0
let L2 = 0
let L3 = 0
let Uturn_ms = 0
let BR = 0
let BL = 0
let Status = 0
let Tune_Right_100_ms = 0
let Tune_Lrft_100_ms = 0
let Tune_Right_70_ms = 0
let Tune_Lrft_70_ms = 0
let Max_Speed = 0
let Ki = 0
let Kd = 0
let Kp = 0
let Pre_Error = 0
let Integral = 0
let Error = 0
let Right_Speed = 0
let Left_Speed = 0
let Ref_R3 = 0
let Ref_R2 = 0
let Ref_R1 = 0
let Ref_L1 = 0
let Ref_L2 = 0
let Ref_L3 = 0
let Follow_30_ms = 0
let Turn_Right_ms = 0
let Turn_Speed = 0
let Backward_45_ms = 0
let Slow_Speed = 0
let Track_JC_ms = 0
let Acc_Speed = 0
let Speed = 0
led.enable(false)
Set_Speed()
Time_ms()
Average_Ref()

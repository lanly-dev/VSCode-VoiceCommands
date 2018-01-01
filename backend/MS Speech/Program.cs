using System;
using System.Speech.Recognition;

namespace WordMatching
{
    static class Program
    {
        // The main entry point for the application.
        [STAThread]
        static void Main(String[] args)
        {
            SpeechRecognitionEngine sre = new SpeechRecognitionEngine(new System.Globalization.CultureInfo("en-US"));
            // String path = args[0] + "\\GrammarList.txt";
            String path = "GrammarList.txt";
            string[] lines = System.IO.File.ReadAllLines(path);
            Choices words = new Choices();
            // Console.WriteLine(lines.Length);
            words.Add(lines);

            GrammarBuilder gb = new GrammarBuilder();
            gb.Append(words);

            // Create the Grammar instance.
            Grammar g = new Grammar(gb);
            sre.LoadGrammar(g);
            sre.SetInputToDefaultAudioDevice();
            sre.SpeechRecognized += new EventHandler<SpeechRecognizedEventArgs>(sre_SpeechRecognized);

            while (true)
            {
                sre.Recognize();
            }
        }
        static void sre_SpeechRecognized(object sender, SpeechRecognizedEventArgs e)
        {
            Console.WriteLine(e.Result.Text);
        }
    }
}
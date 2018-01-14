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
      Console.WriteLine("Welcome!!!");
      SpeechRecognitionEngine sre = new SpeechRecognitionEngine(new System.Globalization.CultureInfo("en-US"));
      string[] lines = new string[]{
        "copy",
        "cut",
        "delete",
        "find",
        "format",
        "go to line",
        "hello world",
        "paste",
        "quick open",
        "redo",
        "search",
        "select all",
        "stop listen",
        "undo",
    	};
      Choices words = new Choices();
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
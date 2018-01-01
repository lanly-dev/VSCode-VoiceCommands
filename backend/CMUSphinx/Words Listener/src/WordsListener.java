
import java.util.logging.Logger;
import edu.cmu.sphinx.api.Configuration;
import edu.cmu.sphinx.api.LiveSpeechRecognizer;
import edu.cmu.sphinx.api.SpeechResult;

public class WordsListener {

	public static void main(String[] args) throws Exception {
		// config
		System.out.println("asddddddddddf");
		Configuration configuration = new Configuration();
		configuration.setAcousticModelPath("resource:/edu/cmu/sphinx/models/en-us/en-us");
		configuration.setDictionaryPath("resource:/8513.dic");
		configuration.setLanguageModelPath("resource:/8513.lm");

		// disable logs
		Logger cmRootLogger = Logger.getLogger("default.config");
		cmRootLogger.setLevel(java.util.logging.Level.OFF);
		String conFile = System.getProperty("java.util.logging.config.file");
		if (conFile == null) {
			System.setProperty("java.util.logging.config.file", "ignoreAllSphinx4LoggingOutput");
		}
		
		// init and listen
		LiveSpeechRecognizer recognizer = new LiveSpeechRecognizer(configuration);
		recognizer.startRecognition(true);
		while (true) {
			SpeechResult result = recognizer.getResult();
			Convert(result.getHypothesis());
		}
	}

	private static void Convert(String hypothesis) {
		switch(hypothesis) {
		case "COPY":
			System.out.print("copy");
			break;
		case "CUT":
			System.out.print("cut");
			break;
		case "FIND":
			System.out.print("find");
			break;
		case "FORMAT":
			System.out.print("format");
			break;
		case "GO_TO_LINE":
			System.out.print("go to line");
			break;
		case "HELLO_WORLD":
			System.out.print("hello world");
			break;
		case "PASTE":
			System.out.print("paste");
			break;
		case "QUICK_OPEN":
			System.out.print("quick open");
			break;
		case "REDO":
			System.out.print("redo");
			break;
		case "REMOVE":
			System.out.print("remove");
			break;
		case "SEARCH":
			System.out.print("search");
			break;
		case "SELECT_ALL":
			System.out.print("select all");
			break;
		case "STOP_LISTEN":
			System.out.print("stop listen");
			break;
		case "UNDO":
			System.out.print("undo");
			break;
		case "":
			System.out.print("???");
			break;
		default:
			System.out.print("Please repeat!");
			break;
		}
	}
}

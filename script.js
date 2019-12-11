/*
 *  Each story has 'id', 'text' 'paths'
 *  Each path has 'target' which should point to specific story id and 'text' as display value.
 */
$(document).ready(function() {
  // jQuery targets
  var $storyContainer = $("#story-container"),
      $pathContainer = $("#path-container"),
      $specialContainer = $("#special-container"),
      $imgContainer = $("#img-container");

  var goodCounter = 0,
      evilCounter = 0,
      humanityCounter = 0,
      secretCounter = 0;    

  var stories = [
    {
      id: 0,
      weight: 0,
      text: '"Awaken, my child. Your journey is only beginning."',
      paths: [
        { target: 1, text: "Hello?" },
        { target: 1, text: "Who's there?" }
      ]
    },
    {
      id: 1,
      weight: 0,
      text:
        "You call out to the mysterious voice, startling yourself with the sound of your own voice and snapping out of your daze. Blinking, you look around and take in your surroundings. You're lying in a fluffy, green bed of moss surrounded by towering trees. Light breaks through the canopy, illuminating the particles in the air and giving everything around you a dreamlike appearance. You stand up, walking over to a nearby pond. Looking down, you see a reflection of yourself. You see: ",
      paths: [
        { target: 2, text: "A man" },
        { target: 3, text: "A woman" }
      ]
    },
    {
      id: 2,
      weight: 0,
      text:
        "You see yourself in the reflection, hair messy, beard unkempt. How long were you out? What are you doing here? You think, trying to at least remember your name.",
      paths: [{ target: 4, text: "Remember your name" }]
    },
    {
      id: 3,
      weight: 0,
      text: "You see yourself in the reflection, your hair is long and unkempt. How long were you out? What are you doing here? You think, trying to at least remember your name."
    },
    {
      id: 4,
      name: name,
      weight: 0,
      text:
        "That's right, your name is " +
        name +
        ". Remembering that brings you a small sense of comfort. Starting to feel like your senses and awareness have returned, you decide what your first step will be in this strange situation.",
      paths: [
        { target: 5, text: "Walk through the clearing in the trees around you." },
        { target: 6, text: "Rip down the branches around you. You owe nothing to this place and nature is currently in your way." }
      ]
    },
    {
      id: 5,
      weight: 0,
      text:
        "Seeing an opening in the surrounding brush, you decide the best plan of action is to just start moving. As you walk, you notice the absence of sound and movement. You see no signs of life, no hint of anyone or anything ever being here. You continue on, losing track of time; the sun overhead doesn't appear to have changed positions, although you're sure you've been walking for hours. Finally, you see a change of scenery in the distance. The path you've been walking forks into two paths. The path on the left leads to rocky terrain; the vegetation seems to end and at the edge of your vision you see a large stone formation. The path on the right looks similar to what you've been walking along this entire time, but you see a lake that is being fed into by a river. The sound of the rushing water is deafening as you realize just how quiet the world around you has been.",
      paths: [
        { target: 7, text: "Take the left path." },
        { target: 8, text: "Take the right path." }
      ]
    },
    {
      id: 6,
      weight: 1,
      text:
        "You start violently tearing the vegetation around you. You snap branches, rip through shrubbery, kick over small rock formations. You do this for hours, wearing yourself to near exhaustion. You've left quite the path of destruction in your wake, but alas, you've forged your own way. You eventually come to a divide in a clearing directly in front of you. There is a path on the left that leads to rocky terrain; vegetation seems to end and at the edge of your vision you see a large stone formation. You also see a path on the right where a river is feeding into a lake. The sound of the rushing water reminds you that you haven't had anything to drink since you awoke.",
      paths: [
        { target: 7, text: "Take the left path" },
        { target: 8, text: "Take the right path." }
      ]
    },
    {
      id: 7,
      weight: 0,
      text:
        "You go left; you're intrigued at the sudden change in terrain and the formation on the horizon is unlike anything you've seen in your current environment. As you're walking, you notice that some of the rocks along your path has been purposefully placed there. They have been smoothed down and are engraved, seeming to depict an event of some sort. You can't make sense of what is going on in any of the engravings, but there is a common feature amongst each stone: a large orb that appears to be the center of attention for each of these depictions.",
      paths: [
        { target: 9, text: "Pick up one of the smaller stones; you want to study this later." },
        { target: 10, text: "Continue along the path; these stones aren't light and you don't want to exhaust yourself further." }
      ]
    },
    {
      id: 8,
      weight: 0,
      text:
        "You go right; .",
      paths: [
        { target: 11, text: "Pick up one of the smaller stones; you want to study this later." },
        { target: 12, text: "Continue along the path; these stones aren't light and you don't want to exhaust yourself further." }
      ]
    },
    {
      id: 9,
      weight: 1,
      text:
        "You pick up one of the smaller stones. It has .",
      paths: [
        { target: 8, text: "Pick up one of the smaller stones; you want to study this later." },
        { target: 9, text: "Continue along the path; these stones aren't light and you don't want to exhaust yourself further." }
      ]
    },
    {
      id: 10,
      weight: 0,
      text:
        "You go left; you're intrigued at the sudden change in terrain and the formation on the horizon is unlike anything you've seen in your current environment. As you're walking, you notice that some of the rocks along your path has been purposefully placed there. They have been smoothed down and are engraved, seeming to depict an event of some sort. You can't make sense of what is going on in any of the engravings, but there is a common feature amongst each stone: a large orb that appears to be the center of attention for each of these depictions.",
      paths: [
        { target: 8, text: "Pick up one of the smaller stones; you want to study this later." },
        { target: 9, text: "Continue along the path; these stones aren't light and you don't want to exhaust yourself further." }
      ]
    }
  ];

  // Takes paths object and return it as button element with custom attribute.
  function getPathHTML(paths) {
    return paths
      .map(function(path) {
        return (
          '<button class="path-btn" data-target=' +
          path.target +
          ">" +
          path.text +
          "</button>"
        );
      })
      .concat();
  }

  // Takes story object and return paragraph element with story text.
  function getStoryHTML(story) {
    return '<p class="story-text">' + story.text + "</p>";
  }

  // Check if the story is ending story.
  function isEnded(story) {
    if (story.paths) return false;
    return true;
  }

  // Takes id and displays interactive story.
  function displayInteractiveStory(stories, id) {
    if (id == 4) {
      getName();
    }

    if (id == 6) {
      evil(id);
    }

    if (id == 9) {
      secret(id);
    }

    var story = stories[id];

    var $story = $(getStoryHTML(story));

    $story.hide();
    $story.fadeIn(1000);

    $storyContainer.append($story);

    if (isEnded(story))
      $pathContainer.html(
        '<button class="path-btn" data-target="replay">Replay?</button>'
      );
    else $pathContainer.html(getPathHTML(story.paths));
  }

  function getName() {
    name = prompt("Please enter your name:", "Harry Potter");
    stories[4].text =
      "That's right, your name is " +
      name +
      ". Remembering that brings you a small sense of comfort. Finally feeling like your senses and awareness have returned, you decide what your first step is in figuring out what in the world is going on.";
    return name;
  }

  function evil(id) {
    evilCounter += stories[id].weight;
  }

  function secret(id) {
    secretCounter += stories[id].weight;
  }

  // Event handler that will setup and invoke displayInteractiveStory()
  // Event delegation makes sure child element of $pathContainer listens to event.
  $pathContainer.click(function(event) {
    var $pathBtn = $(event.target);
    var nextStoryId = $pathBtn.attr("data-target");
    // I want to refactor this part as it looks ugly and easily breaks.
    if (nextStoryId === "replay") {
      $storyContainer.html("");
      $pathContainer.html("");
      displayInteractiveStory(stories, 0);
    } else displayInteractiveStory(stories, nextStoryId);
  });

  // Display initial story on inital render
  // story with id 0 refers to start of the story.
  displayInteractiveStory(stories, 0);
});

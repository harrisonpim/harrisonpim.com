---
layout: post
title: "Exploring Wellcome Collection with computer vision"
excerpt: Wellcome Collection is home to a lot of images. Here’s how we’re using machine learning to improve access to them.
---

Wellcome Collection is home to a lot of images. 120,000 of them are currently accessible through the [catalogue API](https://developers.wellcomecollection.org/catalogue), while a further 40 million are openly licensed and freely available for anyone to use. Our digitisation team are churning through the rest of the collection at an incredible rate, producing thousands of new digital images every day.

![Octavo books in strong rooms](https://iiif.wellcomecollection.org/image/L0015802.jpg/full/full/0/default.jpg)
_We’ve got loads of books, and we’re digitising all of them | [Octavo books in strong rooms](https://wellcomecollection.org/works/ytgd5t2s). [CC BY](https://creativecommons.org/licenses/by/4.0/)_

Making sense of that volume of material by hand is an almost impossible task. Experts use years of training and experience to disentangle and catalogue the connections between works, but there’s no way they can process the digitised works in enough detail at the rate we’re creating them. That kind of intricate work is enormously valuable and anything we can do to speed up their workflow is a benefit to everyone.
Also, while some of the people using our catalogue’s front-end are domain experts, a lot of them aren’t, and we can’t expect them to have the passion or patience to trawl through every work in the collection to find something they’re interested in.
By integrating machine learning into the ways we access the collection, we’re making some of the awkward early-stage work faster and easier for the experts while improving people’s experiences accessing the collection online.
As an example, in this post we’ll be using machine learning to find and measure visual similarities between all of the images in our collection.

## Image classifiers and classification vectors

Image classification is a very common task in machine learning, and it’s the starting point for our similarity work here.
Neural networks are usually trained to recognise the things that people usually photograph — things like dogs, cats, people, and cars.

![Domestic pet. dog health check](https://iiif.wellcomecollection.org/image/A0001296.jpg/full/full/0/default.jpg)
_Machine learning tells me that this is definitely a dog | [Domestic pet. dog health check](https://iiif.wellcomecollection.org/image/A0001296.jpg/full/full/0/default.jpges/by/4.0/). Credit: Caroline Gunn. [CC BY](https://creativecommons.org/licenses/by/4.0/)_

Because the classification is being done computationally, we need a way of representing our categories numerically. Using the categories `[dog, cat, man, car]` as an example, the network produces a classification vector in the following format for each new image:

```
dog = [1, 0, 0, 0]
cat = [0, 1, 0, 0]
man = [0, 0, 1, 0]
car = [0, 0, 0, 1]
```

Computers are now absurdly good at this kind of thing, scoring higher than humans in many tasks that would have been considered impossible a few years ago, and working only with the images’ raw pixel data. They’re also incredibly fast — it would only take a few minutes to pass the entirety of Wellcome Collection’s image catalogue through a simple classifier.

## Feature vectors

The binary output of a classification network can tell us whether a picture is of a dog or not, but that information isn’t very subtle. We could use the classification vectors to find all of the dog pictures in the collection, but we wouldn’t be able to work out whether any of those dogs are Labradors, or which ones look most like a new, previously unseen dog. There’s only one bit of information in that vector and we can’t do much with it.

![Domestic pet. Diabetic dog.](https://iiif.wellcomecollection.org/image/A0001300.jpg/full/full/0/default.jpg)
![A St Bernard dog resting on the steps of a staircase.](https://iiif.wellcomecollection.org/image/V0021884.jpg/full/full/0/default.jpg)
![Walk test for hip dysplasia — on a dog.](https://iiif.wellcomecollection.org/image/A0000035.jpg/full/full/0/default.jpg)
_Pretty sure that these are all `[1, 0, 0, 0]`s too | [Domestic pet. Diabetic dog.](https://wellcomecollection.org/works/t42nr3ke) Credit Caroline Gunn. [CC BY](https://creativecommons.org/licenses/by/4.0/) | [A St Bernard dog resting on the steps of a staircase.](https://wellcomecollection.org/works/tetkyhr7) [CC BY](https://creativecommons.org/licenses/by/4.0/) | [Walk test for hip dysplasia — on a dog.](https://wellcomecollection.org/works/wvmaevhm) Credit: Royal Veterinary College. [CC BY-NC](https://creativecommons.org/licenses/by-nc/4.0/)_

However, thanks to the layered nature of neural networks, we have access to a few other vectors. The network’s intermediate layers (those between the raw pixel inputs and the classification vector outputs) contain all of the information about how the network came to its classification decision.

Each element in our chosen feature vector array corresponds to a visual feature or shape like `paw`, `grass`, `pointy ear`, `floppy ear`, etc, and their value corresponds to how strongly the network believes that that feature is present in the image. The combination of high values in the `paw` and `floppy ear` elements of the feature vector might contribute to the final classification layer outputting a `1` in the `dog` position over the `car` position, for example.

These vectors can take on any of the values _between_ `0` and `1` in each position and are usually much bigger than our classification vectors, allowing them to encode much more nuance than the classification vectors.

A 1000-class classification vector (top) and a 4096-dimensional feature vector (bottom) for a single image, where the height of each bar represents the strength of an activation. The feature vector is much more descriptive, making it a good choice for computing image similarity.

![classification_vector](/assets/images/wellcome_computer_vision/classification_vector.png)
![feature_vector](/assets/images/wellcome_computer_vision/feature_vector.png)
_A 1000-class classification vector (top) and a 4096-dimensional feature vector (bottom) for a single image, where the height of each bar represents the strength of an activation. The feature vector is much more descriptive, making it a good choice for computing image similarity._

Producing a feature vector is just as quick and easy as making a classification. We’re just asking the same network to give us the bits of information that would have contributed to its final classification decision, rather than asking for the decision itself.

## Similarity

So far, we’ve worked out a way of producing an information-rich, numerical description of every image in the collection. It’s fair to assume that similar images will be described by similar levels of a similar set of features, so by asking the following sorts of questions about a pair of images, we should be able to determine how similar they are:

Do they have a similar amount of `pointy ear`?  
Do they have a similar amount of `floppy ear`?  
How much `bicycle wheel` are they showing?  
How much `handwritten text` can you see in each one?  
Is there a similar amount of `light background`?  
What about `dark borders`?

All of these questions are wrapped up into a single mathematical calculation, covering every feature in our feature vector. The calculation produces a single number between `0` and `1` which gives us a measure of the ‘distance’ between the vectors. The smaller the distance between the feature vectors, the more similar the images.

## The results

We can now grab any image in our collection and ask for its closest matches! Here are a few examples.

![A fox running through reeds near a lake. Etching by J. E. Ridinger.](https://iiif.wellcomecollection.org/image/V0021056EL.jpg/full/full/0/default.jpg)
![A beaver sitting on a lattice work of branches on the river shores. Etching by J. E. Ridinger.](https://iiif.wellcomecollection.org/image/V0021069.jpg/full/full/0/default.jpg)
![A greyhound used for coursing hares standing on a forest clearing. Etching by J. E. Ridinger.](https://iiif.wellcomecollection.org/image/V0021042EL.jpg/full/full/0/default.jpg)
![Small bulldog standing in front of a large rock. Etching by J. E. Ridinger.](https://iiif.wellcomecollection.org/image/V0021036ER.jpg/full/full/0/default.jpg)
![An enraged lion is roaring and leaning with its front paws on a rock. Etching by J. E. Ridinger.](https://iiif.wellcomecollection.org/image/V0021051ER.jpg/full/full/0/default.jpg)
_[A fox running through reeds near a lake](https://wellcomecollection.org/works/wkbsmkxj) | [A beaver sitting on a lattice work of branches on the river shores](https://wellcomecollection.org/works/jqygh5zs) | [A greyhound used for coursing hares standing on a forest clearing](https://wellcomecollection.org/works/frup56pv) | [Small bulldog standing in front of a large rock](https://wellcomecollection.org/works/qmq2n7jd) | [An enraged lion is roaring and leaning with its front paws on a rock](https://wellcomecollection.org/works/gmnpbrfs)_

The first images in each section here are the query images — the subsequent images are the ones we’ve measured to be most similar according to their feature vectors.

![53 in the form of a double helix.](https://iiif.wellcomecollection.org/image/B0004904.jpg/full/full/0/default.jpg)
![A snake, dark brown in colour and stout in shape.](https://iiif.wellcomecollection.org/image/V0023387.jpg/full/full/0/default.jpg)
![A snake, dark green/brown in colour, with dark brown oval-shaped markings or cross-bands edged in white.](https://iiif.wellcomecollection.org/image/V0023408.jpg/full/full/0/default.jpg)
![A spotted eel.](https://iiif.wellcomecollection.org/image/V0022070.jpg/full/full/0/default.jpg)
![Cervical cap, ‘Improved Gem’ type.](https://iiif.wellcomecollection.org/image/L0065286.jpg/full/full/0/default.jpg)
_[53 in the form of a double helix.](https://wellcomecollection.org/works/hg3eqrjd) | [A snake, dark brown in colour and stout in shape.](https://wellcomecollection.org/works/ck9t8pq7) | [A snake, dark green/brown in colour, with dark brown oval-shaped markings or cross-bands edged in white.](https://wellcomecollection.org/works/ey57cgyk) | [A spotted eel.](https://wellcomecollection.org/works/b22kvhud) | [Cervical cap, ‘Improved Gem’ type.](https://wellcomecollection.org/works/g27dnk3c)_

Both regular and abstract forms seem to be captured pretty well by the network!

![Edwards’ “Harlene” for the hair: the great hair](https://iiif.wellcomecollection.org/image/L0031645.jpg/full/full/0/default.jpg)
![Book jacket — Zorastro](https://iiif.wellcomecollection.org/image/L0043530.jpg/full/full/0/default.jpg)
![Japan: a roof finial in Nagoya castle in the form of a dragon](https://iiif.wellcomecollection.org/image/V0047438.jpg/full/full/0/default.jpg)
![An Indian wrestler seated](https://iiif.wellcomecollection.org/image/L0041027.jpg/full/full/0/default.jpg)
_[Edwards’ “Harlene” for the hair: the great hair](https://wellcomecollection.org/works/pax824ry) | [Book jacket — Zorastro](https://wellcomecollection.org/works/ztj53jzf) | [Japan: a roof finial in Nagoya castle in the form of a dragon](https://wellcomecollection.org/works/x75y4cdb) | [An Indian wrestler seated](https://wellcomecollection.org/works/wvezezey)_

Again, these matches are based on nothing but the raw pixel data in each image — the network has no access to any of the metadata and is making decisions based purely on the images’ visual similarity.

![Skeleton: seen from the front](https://iiif.wellcomecollection.org/image/V0007938EL.jpg/full/full/0/default.jpg)
![Human skeleton with left arm extended](https://iiif.wellcomecollection.org/image/V0008045.jpg/full/full/0/default.jpg)
![Sketches of anatomy](https://iiif.wellcomecollection.org/image/L0011851.jpg/full/full/0/default.jpg)
![Skeleton, front view](https://iiif.wellcomecollection.org/image/V0008168.jpg/full/full/0/default.jpg)
![Skeleton: seen from behind](https://iiif.wellcomecollection.org/image/V0007939EL.jpg/full/full/0/default.jpg)
[Skeleton: seen from the front](https://wellcomecollection.org/works/vzqmu92e) | [Human skeleton with left arm extended](https://wellcomecollection.org/works/qwcrcssy) | [Sketches of anatomy](https://wellcomecollection.org/works/vasu72w2) | [Skeleton, front view](https://wellcomecollection.org/works/ry58kfpm) | [Skeleton: seen from behind](https://wellcomecollection.org/works/ubv8fjgb)

We can also use this technique to compare images from outside the collections to those within it, letting us do a kind of reverse image-search! Producing a feature vector for the MERL’s famous unit points us to another image of a hefty sheep from our own collection, for example.

![The MERL’s absolute unit](https://pbs.twimg.com/media/DaWITF5WsAI-CYU?format=jpg&name=large)
![Suffolk ram being measured (good condition).](https://iiif.wellcomecollection.org/image/A0000818.jpg/full/full/0/default.jpg)
[The MERL’s absolute unit](https://twitter.com/TheMERL/status/983341970318938112) Credit: [MERL. Ref: P FS PH1/K90651](https://www.reading.ac.uk/merl/research/countrysideimages/merl-PFSPH1_K90651.aspx) // [Suffolk ram being measured (good condition). Credit: Royal Veterinary College.](https://wellcomecollection.org/works/fa4bnckm) [CC BY-NC](https://creativecommons.org/licenses/by-nc/4.0/)

## How are we using this at Wellcome?

Being able to generate this kind of information is useful in lots of contexts. We’re using image similarity internally to find clusters of works in the collection to improve our cataloguing. We’ve used it to strip out unwanted images from our public collections. We’re likely to start trialling an image similarity feature on individual works pages in the hope of extending users’ journeys and exposing parts of the collection more serendipitously. Most importantly, these feature vectors provide a backbone for lots of Wellcome Collection’s forthcoming developments with machine learning. Watch this space!

## Still want to know more?

We work openly at Wellcome, and all of the platform team’s code is available for anyone to read and reuse, including everything I’ve produced in the /data_science folder. The research I’ve described above is documented in much more detail in a set of jupyter notebooks, alongside the working code I used to produce the results above. Feel free to get in touch on twitter if you have any questions!

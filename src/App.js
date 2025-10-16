import React, { useState, useEffect } from 'react';

const ScentGuessGame = () => {
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  // Game data with public folder asset paths
  const products = [
    {
      name: "Keep My Colour Blonde Toning Spray",
      scent: "Strawberry",
      image: "/assets/keep-my-colour-blonde-toning-spray.png",
      description: "A leave in spray with heat protection to neutralise brassiness and enhance blonde tones in hair.",
      productType: "spray"
    },
    {
      name: "Miracle Spray Hair Treatment",
      scent: "Watermelon", 
      image: "/assets/miracle-spray-hair-treatment.png",
      description: "Delivering eleven benefits your hair will love. Leave in hair treatment.",
      productType: "spray"
    },
    {
      name: "Deep Clean Clarifying Shampoo",
      scent: "Orange",
      image: "/assets/deep-clean-clarifying-shampoo.png",
      description: "A daily cleansing shampoo that removes excess oil from the hair and scalp. For all hair types.",
      productType: "shampoo"
    },
    {
      name: "Detangle My Hair Leave-In Spray", 
      scent: "Pear",
      image: "/assets/detangle-my-hair-leave-in-spray.png",
      description: "A lightweight detangler with pear extract to hydrate and tame hair. For all hair types.",
      productType: "spray"
    },
    {
      name: "Miracle Hair Mask",
      scent: "Coconut",
      image: "/assets/miracle-hair-mask.png",
      description: "A blend of Aloe Vera and White Mulberry Leaf to restore and treat lost moisture, this antioxidant rich formula will leave hair feeling strong and hydrated.",
      productType: "mask"
    }
  ];

  const fruitOptions = ["Strawberry", "Watermelon", "Orange", "Pear", "Coconut"];
  
  const fruitImages = {
    "Strawberry": "/assets/strawberry.jpg", 
    "Watermelon": "/assets/watermelon.jpg", 
    "Orange": "/assets/orange.jpg", 
    "Pear": "/assets/pear.jpg", 
    "Coconut": "/assets/coconut.jpg" 
  };

  const fruitEmojis = {
    "Strawberry": "🍓",
    "Watermelon": "🍉", 
    "Orange": "🍊",
    "Pear": "🍐",
    "Coconut": "🥥"
  };

  // Function to shuffle array for randomizing answer options
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Generate randomized fruit options for current question
  const getRandomizedFruitOptions = () => {
    return shuffleArray(fruitOptions);
  };

  // Confetti animation component
  const ConfettiAnimation = () => {
    useEffect(() => {
      const confettiContainer = document.getElementById('confetti-container');
      if (confettiContainer) {
        for (let i = 0; i < 50; i++) {
          const confetti = document.createElement('div');
          confetti.className = 'confetti-piece';
          confetti.style.left = Math.random() * 100 + '%';
          confetti.style.animationDelay = Math.random() * 2 + 's';
          confetti.style.backgroundColor = ['#FFFFFF', '#FFE5E5', '#FFB3B3'][Math.floor(Math.random() * 3)];
          confettiContainer.appendChild(confetti);
        }
      }
    }, []);

    return (
      <>
        <style>{`
          #confetti-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: hidden;
            z-index: 1000;
          }
          
          .confetti-piece {
            position: absolute;
            width: 10px;
            height: 10px;
            animation: confettiFall 3s linear infinite;
          }
          
          @keyframes confettiFall {
            0% {
              transform: translateY(-100vh) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) rotate(720deg);
              opacity: 0;
            }
          }
        `}</style>
        <div id="confetti-container"></div>
      </>
    );
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
    
    if (answer === products[currentQuestion].scent) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      if (currentQuestion < products.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer('');
        setShowFeedback(false);
      } else {
        setCurrentScreen('results');
      }
    }, 2000);
  };

  const resetGame = () => {
    setCurrentScreen('landing');
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer('');
    setShowFeedback(false);
  };

  const startGame = () => {
    setCurrentScreen('game');
  };

  // Landing Page
  if (currentScreen === 'landing') {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@900&display=swap');
          
          * {
            font-family: 'Poppins', sans-serif;
            font-weight: 900;
          }
        `}</style>
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#FF696D',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            {/* White Logo */}
            <div style={{
              marginBottom: '50px',
              display: 'flex',
              justifyContent: 'center'
            }}>
              <img 
                src="/assets/eleven-australia-logo-white.png"
                alt="ELEVEN AUSTRALIA"
                style={{
                  height: '50px',
                  objectFit: 'contain'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  const fallback = e.target.parentNode.querySelector('.logo-fallback');
                  if (fallback) {
                    fallback.style.display = 'block';
                  }
                }}
              />
              <div 
                className="logo-fallback"
                style={{
                  display: 'none',
                  color: 'white',
                  fontSize: '1.5rem',
                  fontWeight: '900',
                  letterSpacing: '3px'
                }}
              >
                ELEVEN AUSTRALIA
              </div>
            </div>
            
            <h1 style={{
              fontSize: '3.5rem',
              fontWeight: '900',
              color: 'white',
              marginBottom: '20px',
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}>
              Guess the Scent
            </h1>
            <h1 style={{
              fontSize: '3.5rem',
              fontWeight: '900',
              color: 'white',
              marginBottom: '40px',
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}>
              to win
            </h1>
            
            <div style={{
              fontSize: '1.2rem',
              color: 'white',
              marginBottom: '40px',
              lineHeight: '1.6',
              fontWeight: '900'
            }}>
              Can you match each Eleven Australia product to win?
            </div>
            
            <button 
              onClick={startGame}
              style={{
                backgroundColor: 'white',
                color: '#FF696D',
                border: 'none',
                padding: '15px 40px',
                fontSize: '1.2rem',
                fontWeight: '900',
                borderRadius: '5px',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#f5f5f5';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'white';
              }}
            >
              Start
            </button>
          </div>
        </div>
      </>
    );
  }

  // Game Screen
  if (currentScreen === 'game') {
    const currentProduct = products[currentQuestion];
    const randomizedFruits = getRandomizedFruitOptions();
    
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@900&display=swap');
          
          * {
            font-family: 'Poppins', sans-serif;
            font-weight: 900;
          }
          
          .fruit-button {
            background-color: white !important;
            border: none !important;
            border-radius: 10px !important;
            padding: 20px !important;
            cursor: pointer !important;
            transition: all 0.3s ease !important;
            font-size: 1.1rem !important;
            font-weight: 900 !important;
            color: #333 !important;
            min-width: 140px !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
          }
          
          .fruit-button:hover {
            border: 3px solid #000 !important;
          }
          
          @media (max-width: 768px) {
            .fruit-button {
              min-width: 120px !important;
              padding: 15px !important;
              font-size: 1rem !important;
            }
          }
        `}</style>
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#FF696D',
          padding: '20px'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            {/* Progress indicator */}
            <div style={{
              marginBottom: '20px',
              color: 'white',
              fontSize: '1.2rem',
              fontWeight: '900'
            }}>
              Question {currentQuestion + 1} of {products.length}
            </div>
            
            {/* Product name */}
            <h2 style={{
              color: 'white',
              fontSize: '1.5rem',
              fontWeight: '900',
              marginBottom: '30px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              {currentProduct.name}
            </h2>
            
            {/* Product display */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              padding: '40px',
              marginBottom: '40px'
            }}>
              {/* Product Image */}
              <div style={{
                width: '250px',
                height: '300px',
                margin: '0 auto 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '10px',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <img 
                  src={currentProduct.image}
                  alt={currentProduct.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    backgroundColor: 'white'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const fallback = e.target.parentNode.querySelector('.image-fallback');
                    if (fallback) {
                      fallback.style.display = 'flex';
                    }
                  }}
                />
                <div 
                  className="image-fallback"
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '10px',
                    display: 'none',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    border: '2px dashed #ccc',
                    position: 'absolute',
                    top: 0,
                    left: 0
                  }}
                >
                  <div style={{ fontSize: '4rem', marginBottom: '10px' }}>
                    {currentProduct.productType === 'spray' ? '🧴' : 
                     currentProduct.productType === 'shampoo' ? '🧴' : '💊'}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#999', textAlign: 'center', padding: '10px' }}>
                    {currentProduct.name}
                  </div>
                </div>
              </div>
              
              <p style={{
                color: '#333',
                fontSize: '1rem',
                lineHeight: '1.6',
                marginBottom: '30px',
                maxWidth: '600px',
                margin: '0 auto 30px',
                fontWeight: '900'
              }}>
                {currentProduct.description}
              </p>
              
              <h3 style={{
                color: 'white',
                backgroundColor: '#FF696D',
                fontSize: '1.5rem',
                fontWeight: '900',
                padding: '15px',
                borderRadius: '10px',
                marginBottom: '0'
              }}>
                Guess the scent
              </h3>
            </div>

            {/* Answer options */}
            {!showFeedback && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                marginBottom: '20px',
                alignItems: 'center'
              }}>
                {/* First row - 3 fruits */}
                <div style={{
                  display: 'flex',
                  gap: '20px',
                  justifyContent: 'center',
                  flexWrap: 'wrap'
                }}>
                  {randomizedFruits.slice(0, 3).map((fruit) => (
                    <button
                      key={fruit}
                      className="fruit-button"
                      onClick={() => handleAnswerSelect(fruit)}
                    >
                      <div className="fruit-image" style={{ marginBottom: '10px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img 
                          src={fruitImages[fruit]}
                          alt={fruit}
                          style={{
                            width: '60px',
                            height: '60px',
                            objectFit: 'contain',
                            borderRadius: '8px'
                          }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            const fallback = e.target.parentNode.querySelector('.fruit-emoji-fallback');
                            if (fallback) {
                              fallback.style.display = 'block';
                            }
                          }}
                        />
                        <div 
                          className="fruit-emoji-fallback"
                          style={{ 
                            fontSize: '3rem', 
                            display: 'none'
                          }}
                        >
                          {fruitEmojis[fruit]}
                        </div>
                      </div>
                      <div className="fruit-text">{fruit}</div>
                    </button>
                  ))}
                </div>
                
                {/* Second row - 2 fruits */}
                <div style={{
                  display: 'flex',
                  gap: '20px',
                  justifyContent: 'center'
                }}>
                  {randomizedFruits.slice(3, 5).map((fruit) => (
                    <button
                      key={fruit}
                      className="fruit-button"
                      onClick={() => handleAnswerSelect(fruit)}
                    >
                      <div className="fruit-image" style={{ marginBottom: '10px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img 
                          src={fruitImages[fruit]}
                          alt={fruit}
                          style={{
                            width: '60px',
                            height: '60px',
                            objectFit: 'contain',
                            borderRadius: '8px'
                          }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            const fallback = e.target.parentNode.querySelector('.fruit-emoji-fallback');
                            if (fallback) {
                              fallback.style.display = 'block';
                            }
                          }}
                        />
                        <div 
                          className="fruit-emoji-fallback"
                          style={{ 
                            fontSize: '3rem', 
                            display: 'none'
                          }}
                        >
                          {fruitEmojis[fruit]}
                        </div>
                      </div>
                      <div className="fruit-text">{fruit}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Feedback */}
            {showFeedback && (
              <div style={{
                backgroundColor: selectedAnswer === currentProduct.scent ? '#4CAF50' : '#F44336',
                color: 'white',
                padding: '20px',
                borderRadius: '10px',
                fontSize: '1.5rem',
                fontWeight: '900'
              }}>
                {selectedAnswer === currentProduct.scent ? (
                  <>
                    <div style={{ fontSize: '3rem', marginBottom: '10px' }}>✓</div>
                    Correct! It's {currentProduct.scent}
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: '3rem', marginBottom: '10px' }}>✗</div>
                    Wrong! It's {currentProduct.scent}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  // Results Screen
  if (currentScreen === 'results') {
    const isPerfectScore = score === products.length;
    
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@900&display=swap');
          
          * {
            font-family: 'Poppins', sans-serif;
            font-weight: 900;
          }
        `}</style>
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#FF696D',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          textAlign: 'center',
          position: 'relative'
        }}>
          {isPerfectScore && <ConfettiAnimation />}
          
          <div style={{
            maxWidth: '600px',
            margin: '0 auto',
            zIndex: 10,
            position: 'relative'
          }}>
            {/* White Logo at top */}
            <div style={{
              marginBottom: '50px',
              display: 'flex',
              justifyContent: 'center'
            }}>
              <img 
                src="/assets/eleven-australia-logo-white.png"
                alt="ELEVEN AUSTRALIA"
                style={{
                  height: '50px',
                  objectFit: 'contain'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  const fallback = e.target.parentNode.querySelector('.logo-fallback');
                  if (fallback) {
                    fallback.style.display = 'block';
                  }
                }}
              />
              <div 
                className="logo-fallback"
                style={{
                  display: 'none',
                  color: 'white',
                  fontSize: '1.5rem',
                  fontWeight: '900',
                  letterSpacing: '3px'
                }}
              >
                ELEVEN AUSTRALIA
              </div>
            </div>
            
            {isPerfectScore ? (
              <>
                <h1 style={{
                  fontSize: '4rem',
                  fontWeight: '900',
                  color: 'white',
                  marginBottom: '30px',
                  textTransform: 'uppercase',
                  letterSpacing: '2px'
                }}>
                  Amazing!
                </h1>
                
                <div style={{
                  fontSize: '1.5rem',
                  color: 'white',
                  marginBottom: '40px',
                  fontWeight: '900',
                  lineHeight: '1.6'
                }}>
                  You got them all correct!
                </div>
              </>
            ) : (
              <>
                <h1 style={{
                  fontSize: '2.5rem',
                  fontWeight: '900',
                  color: 'white',
                  marginBottom: '30px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  You have {score} of 5 correct.
                </h1>
              </>
            )}
            
            <button 
              onClick={resetGame}
              style={{
                backgroundColor: 'white',
                color: '#FF696D',
                border: 'none',
                padding: '15px 40px',
                fontSize: '1.2rem',
                fontWeight: '900',
                borderRadius: '5px',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#f5f5f5';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'white';
              }}
            >
              {isPerfectScore ? 'Play Again' : 'Try Again'}
            </button>
          </div>
        </div>
      </>
    );
  }
};

export default ScentGuessGame;